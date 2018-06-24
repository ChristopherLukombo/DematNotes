import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssignmentManager } from './assignment-manager.model';
import { AssignmentManagerPopupService } from './assignment-manager-popup.service';
import { AssignmentManagerService } from './assignment-manager.service';
import { SchoolYear, SchoolYearService } from '../school-year';
import { School, SchoolService } from '../school';
import { Manager, ManagerService } from '../manager';

@Component({
    selector: 'jhi-assignment-manager-dialog',
    templateUrl: './assignment-manager-dialog.component.html'
})
export class AssignmentManagerDialogComponent implements OnInit {

    assignmentManager: AssignmentManager;
    isSaving: boolean;

    schoolyears: SchoolYear[];

    schools: School[];

    managers: Manager[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assignmentManagerService: AssignmentManagerService,
        private schoolYearService: SchoolYearService,
        private schoolService: SchoolService,
        private managerService: ManagerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.schoolYearService.query()
            .subscribe((res: HttpResponse<SchoolYear[]>) => { this.schoolyears = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolService.query()
            .subscribe((res: HttpResponse<School[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.managerService.query()
            .subscribe((res: HttpResponse<Manager[]>) => { this.managers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assignmentManager.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assignmentManagerService.update(this.assignmentManager));
        } else {
            this.subscribeToSaveResponse(
                this.assignmentManagerService.create(this.assignmentManager));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AssignmentManager>>) {
        result.subscribe((res: HttpResponse<AssignmentManager>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AssignmentManager) {
        this.eventManager.broadcast({ name: 'assignmentManagerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSchoolYearById(index: number, item: SchoolYear) {
        return item.id;
    }

    trackSchoolById(index: number, item: School) {
        return item.id;
    }

    trackManagerById(index: number, item: Manager) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-assignment-manager-popup',
    template: ''
})
export class AssignmentManagerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assignmentManagerPopupService: AssignmentManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assignmentManagerPopupService
                    .open(AssignmentManagerDialogComponent as Component, params['id']);
            } else {
                this.assignmentManagerPopupService
                    .open(AssignmentManagerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
