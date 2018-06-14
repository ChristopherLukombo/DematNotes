import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Absence } from './absence.model';
import { AbsencePopupService } from './absence-popup.service';
import { AbsenceService } from './absence.service';
import { Module, ModuleService } from '../module';
import { Student, StudentService } from '../student';

@Component({
    selector: 'jhi-absence-dialog',
    templateUrl: './absence-dialog.component.html'
})
export class AbsenceDialogComponent implements OnInit {

    absence: Absence;
    isSaving: boolean;

    modules: Module[];

    students: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private absenceService: AbsenceService,
        private moduleService: ModuleService,
        private studentService: StudentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduleService.query()
            .subscribe((res: HttpResponse<Module[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<Student[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.absence.id !== undefined) {
            this.subscribeToSaveResponse(
                this.absenceService.update(this.absence));
        } else {
            this.subscribeToSaveResponse(
                this.absenceService.create(this.absence));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Absence>>) {
        result.subscribe((res: HttpResponse<Absence>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Absence) {
        this.eventManager.broadcast({ name: 'absenceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModuleById(index: number, item: Module) {
        return item.id;
    }

    trackStudentById(index: number, item: Student) {
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
    selector: 'jhi-absence-popup',
    template: ''
})
export class AbsencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absencePopupService: AbsencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.absencePopupService
                    .open(AbsenceDialogComponent as Component, params['id']);
            } else {
                this.absencePopupService
                    .open(AbsenceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
