import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DelayStudentMySuffix } from './delay-student-my-suffix.model';
import { DelayStudentMySuffixPopupService } from './delay-student-my-suffix-popup.service';
import { DelayStudentMySuffixService } from './delay-student-my-suffix.service';
import { StudentMySuffix, StudentMySuffixService } from '../student-my-suffix';

@Component({
    selector: 'jhi-delay-student-my-suffix-dialog',
    templateUrl: './delay-student-my-suffix-dialog.component.html'
})
export class DelayStudentMySuffixDialogComponent implements OnInit {

    delayStudent: DelayStudentMySuffix;
    isSaving: boolean;

    students: StudentMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private delayStudentService: DelayStudentMySuffixService,
        private studentService: StudentMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentMySuffix[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<DelayStudentMySuffix>>) {
        result.subscribe((res: HttpResponse<DelayStudentMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DelayStudentMySuffix) {
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

    trackStudentById(index: number, item: StudentMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-delay-student-my-suffix-popup',
    template: ''
})
export class DelayStudentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private delayStudentPopupService: DelayStudentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.delayStudentPopupService
                    .open(DelayStudentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.delayStudentPopupService
                    .open(DelayStudentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
