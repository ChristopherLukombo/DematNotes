import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Intervention } from './intervention.model';
import { InterventionPopupService } from './intervention-popup.service';
import { InterventionService } from './intervention.service';
import { Module, ModuleService } from '../module';
import { Teacher, TeacherService } from '../teacher';

@Component({
    selector: 'jhi-intervention-dialog',
    templateUrl: './intervention-dialog.component.html'
})
export class InterventionDialogComponent implements OnInit {

    intervention: Intervention;
    isSaving: boolean;

    modules: Module[];

    teachers: Teacher[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private interventionService: InterventionService,
        private moduleService: ModuleService,
        private teacherService: TeacherService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduleService.query()
            .subscribe((res: HttpResponse<Module[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.teacherService.query()
            .subscribe((res: HttpResponse<Teacher[]>) => { this.teachers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Intervention>>) {
        result.subscribe((res: HttpResponse<Intervention>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Intervention) {
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

    trackModuleById(index: number, item: Module) {
        return item.id;
    }

    trackTeacherById(index: number, item: Teacher) {
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
    selector: 'jhi-intervention-popup',
    template: ''
})
export class InterventionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interventionPopupService: InterventionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interventionPopupService
                    .open(InterventionDialogComponent as Component, params['id']);
            } else {
                this.interventionPopupService
                    .open(InterventionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
