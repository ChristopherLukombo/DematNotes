import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InterventionMySuffix } from './intervention-my-suffix.model';
import { InterventionMySuffixPopupService } from './intervention-my-suffix-popup.service';
import { InterventionMySuffixService } from './intervention-my-suffix.service';
import { TeacherMySuffix, TeacherMySuffixService } from '../teacher-my-suffix';
import { ModuleMySuffix, ModuleMySuffixService } from '../module-my-suffix';

@Component({
    selector: 'jhi-intervention-my-suffix-dialog',
    templateUrl: './intervention-my-suffix-dialog.component.html'
})
export class InterventionMySuffixDialogComponent implements OnInit {

    intervention: InterventionMySuffix;
    isSaving: boolean;

    teachers: TeacherMySuffix[];

    modules: ModuleMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private interventionService: InterventionMySuffixService,
        private teacherService: TeacherMySuffixService,
        private moduleService: ModuleMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.teacherService.query()
            .subscribe((res: HttpResponse<TeacherMySuffix[]>) => { this.teachers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.moduleService.query()
            .subscribe((res: HttpResponse<ModuleMySuffix[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.intervention.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interventionService.update(this.intervention));
        } else {
            this.subscribeToSaveResponse(
                this.interventionService.create(this.intervention));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InterventionMySuffix>>) {
        result.subscribe((res: HttpResponse<InterventionMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InterventionMySuffix) {
        this.eventManager.broadcast({ name: 'interventionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTeacherById(index: number, item: TeacherMySuffix) {
        return item.id;
    }

    trackModuleById(index: number, item: ModuleMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-intervention-my-suffix-popup',
    template: ''
})
export class InterventionMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interventionPopupService: InterventionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interventionPopupService
                    .open(InterventionMySuffixDialogComponent as Component, params['id']);
            } else {
                this.interventionPopupService
                    .open(InterventionMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
