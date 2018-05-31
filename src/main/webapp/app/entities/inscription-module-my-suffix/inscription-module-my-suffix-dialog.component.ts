import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InscriptionModuleMySuffix } from './inscription-module-my-suffix.model';
import { InscriptionModuleMySuffixPopupService } from './inscription-module-my-suffix-popup.service';
import { InscriptionModuleMySuffixService } from './inscription-module-my-suffix.service';
import { ModuleMySuffix, ModuleMySuffixService } from '../module-my-suffix';
import { StudentMySuffix, StudentMySuffixService } from '../student-my-suffix';

@Component({
    selector: 'jhi-inscription-module-my-suffix-dialog',
    templateUrl: './inscription-module-my-suffix-dialog.component.html'
})
export class InscriptionModuleMySuffixDialogComponent implements OnInit {

    inscriptionModule: InscriptionModuleMySuffix;
    isSaving: boolean;

    modules: ModuleMySuffix[];

    students: StudentMySuffix[];
    inscriptionDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inscriptionModuleService: InscriptionModuleMySuffixService,
        private moduleService: ModuleMySuffixService,
        private studentService: StudentMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduleService.query()
            .subscribe((res: HttpResponse<ModuleMySuffix[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentMySuffix[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inscriptionModule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inscriptionModuleService.update(this.inscriptionModule));
        } else {
            this.subscribeToSaveResponse(
                this.inscriptionModuleService.create(this.inscriptionModule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InscriptionModuleMySuffix>>) {
        result.subscribe((res: HttpResponse<InscriptionModuleMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InscriptionModuleMySuffix) {
        this.eventManager.broadcast({ name: 'inscriptionModuleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModuleById(index: number, item: ModuleMySuffix) {
        return item.id;
    }

    trackStudentById(index: number, item: StudentMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-inscription-module-my-suffix-popup',
    template: ''
})
export class InscriptionModuleMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscriptionModulePopupService: InscriptionModuleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inscriptionModulePopupService
                    .open(InscriptionModuleMySuffixDialogComponent as Component, params['id']);
            } else {
                this.inscriptionModulePopupService
                    .open(InscriptionModuleMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
