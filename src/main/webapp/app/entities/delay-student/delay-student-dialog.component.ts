import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DelayStudent } from './delay-student.model';
import { DelayStudentPopupService } from './delay-student-popup.service';
import { DelayStudentService } from './delay-student.service';
import { Module, ModuleService } from '../module';
import { Student, StudentService } from '../student';

@Component({
    selector: 'jhi-delay-student-dialog',
    templateUrl: './delay-student-dialog.component.html'
})
export class DelayStudentDialogComponent implements OnInit {

    delayStudent: DelayStudent;
    isSaving: boolean;

    modules: Module[];

    students: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private delayStudentService: DelayStudentService,
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
        if (this.delayStudent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.delayStudentService.update(this.delayStudent));
        } else {
            this.subscribeToSaveResponse(
                this.delayStudentService.create(this.delayStudent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DelayStudent>>) {
        result.subscribe((res: HttpResponse<DelayStudent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DelayStudent) {
        this.eventManager.broadcast({ name: 'delayStudentListModification', content: 'OK'});
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
    selector: 'jhi-delay-student-popup',
    template: ''
})
export class DelayStudentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private delayStudentPopupService: DelayStudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.delayStudentPopupService
                    .open(DelayStudentDialogComponent as Component, params['id']);
            } else {
                this.delayStudentPopupService
                    .open(DelayStudentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
