import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolYearMySuffix } from './school-year-my-suffix.model';
import { SchoolYearMySuffixPopupService } from './school-year-my-suffix-popup.service';
import { SchoolYearMySuffixService } from './school-year-my-suffix.service';

@Component({
    selector: 'jhi-school-year-my-suffix-dialog',
    templateUrl: './school-year-my-suffix-dialog.component.html'
})
export class SchoolYearMySuffixDialogComponent implements OnInit {

    schoolYear: SchoolYearMySuffix;
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private schoolYearService: SchoolYearMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.schoolYear.id !== undefined) {
            this.subscribeToSaveResponse(
                this.schoolYearService.update(this.schoolYear));
        } else {
            this.subscribeToSaveResponse(
                this.schoolYearService.create(this.schoolYear));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SchoolYearMySuffix>>) {
        result.subscribe((res: HttpResponse<SchoolYearMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SchoolYearMySuffix) {
        this.eventManager.broadcast({ name: 'schoolYearListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-school-year-my-suffix-popup',
    template: ''
})
export class SchoolYearMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolYearPopupService: SchoolYearMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schoolYearPopupService
                    .open(SchoolYearMySuffixDialogComponent as Component, params['id']);
            } else {
                this.schoolYearPopupService
                    .open(SchoolYearMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
