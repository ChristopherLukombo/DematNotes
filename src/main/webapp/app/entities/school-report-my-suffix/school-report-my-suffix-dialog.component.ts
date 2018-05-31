import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolReportMySuffix } from './school-report-my-suffix.model';
import { SchoolReportMySuffixPopupService } from './school-report-my-suffix-popup.service';
import { SchoolReportMySuffixService } from './school-report-my-suffix.service';

@Component({
    selector: 'jhi-school-report-my-suffix-dialog',
    templateUrl: './school-report-my-suffix-dialog.component.html'
})
export class SchoolReportMySuffixDialogComponent implements OnInit {

    schoolReport: SchoolReportMySuffix;
    isSaving: boolean;
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private schoolReportService: SchoolReportMySuffixService,
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
        if (this.schoolReport.id !== undefined) {
            this.subscribeToSaveResponse(
                this.schoolReportService.update(this.schoolReport));
        } else {
            this.subscribeToSaveResponse(
                this.schoolReportService.create(this.schoolReport));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SchoolReportMySuffix>>) {
        result.subscribe((res: HttpResponse<SchoolReportMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SchoolReportMySuffix) {
        this.eventManager.broadcast({ name: 'schoolReportListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-school-report-my-suffix-popup',
    template: ''
})
export class SchoolReportMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolReportPopupService: SchoolReportMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schoolReportPopupService
                    .open(SchoolReportMySuffixDialogComponent as Component, params['id']);
            } else {
                this.schoolReportPopupService
                    .open(SchoolReportMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
