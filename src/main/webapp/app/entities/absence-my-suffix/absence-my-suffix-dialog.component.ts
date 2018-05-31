import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AbsenceMySuffix } from './absence-my-suffix.model';
import { AbsenceMySuffixPopupService } from './absence-my-suffix-popup.service';
import { AbsenceMySuffixService } from './absence-my-suffix.service';
import { StudentMySuffix, StudentMySuffixService } from '../student-my-suffix';

@Component({
    selector: 'jhi-absence-my-suffix-dialog',
    templateUrl: './absence-my-suffix-dialog.component.html'
})
export class AbsenceMySuffixDialogComponent implements OnInit {

    absence: AbsenceMySuffix;
    isSaving: boolean;

    students: StudentMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private absenceService: AbsenceMySuffixService,
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
        if (this.absence.id !== undefined) {
            this.subscribeToSaveResponse(
                this.absenceService.update(this.absence));
        } else {
            this.subscribeToSaveResponse(
                this.absenceService.create(this.absence));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AbsenceMySuffix>>) {
        result.subscribe((res: HttpResponse<AbsenceMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AbsenceMySuffix) {
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

    trackStudentById(index: number, item: StudentMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-absence-my-suffix-popup',
    template: ''
})
export class AbsenceMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absencePopupService: AbsenceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.absencePopupService
                    .open(AbsenceMySuffixDialogComponent as Component, params['id']);
            } else {
                this.absencePopupService
                    .open(AbsenceMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
