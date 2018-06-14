import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolReport } from './school-report.model';
import { SchoolReportPopupService } from './school-report-popup.service';
import { SchoolReportService } from './school-report.service';

@Component({
    selector: 'jhi-school-report-dialog',
    templateUrl: './school-report-dialog.component.html'
})
export class SchoolReportDialogComponent implements OnInit {

    schoolReport: SchoolReport;
    isSaving: boolean;
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private schoolReportService: SchoolReportService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<SchoolReport>>) {
        result.subscribe((res: HttpResponse<SchoolReport>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SchoolReport) {
        this.eventManager.broadcast({ name: 'schoolReportListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-school-report-popup',
    template: ''
})
export class SchoolReportPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolReportPopupService: SchoolReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schoolReportPopupService
                    .open(SchoolReportDialogComponent as Component, params['id']);
            } else {
                this.schoolReportPopupService
                    .open(SchoolReportDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
