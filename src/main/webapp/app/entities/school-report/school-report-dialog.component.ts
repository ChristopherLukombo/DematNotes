import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SchoolReport } from './school-report.model';
import { SchoolReportPopupService } from './school-report-popup.service';
import { SchoolReportService } from './school-report.service';
import { YearPeriod, YearPeriodService } from '../year-period';
import { Student, StudentService } from '../student';
import { Manager, ManagerService } from '../manager';

@Component({
    selector: 'jhi-school-report-dialog',
    templateUrl: './school-report-dialog.component.html'
})
export class SchoolReportDialogComponent implements OnInit {

    schoolReport: SchoolReport;
    isSaving: boolean;

    yearperiods: YearPeriod[];

    students: Student[];

    managers: Manager[];
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private schoolReportService: SchoolReportService,
        private yearPeriodService: YearPeriodService,
        private studentService: StudentService,
        private managerService: ManagerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.yearPeriodService.query()
            .subscribe((res: HttpResponse<YearPeriod[]>) => { this.yearperiods = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<Student[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.managerService.query()
            .subscribe((res: HttpResponse<Manager[]>) => { this.managers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackYearPeriodById(index: number, item: YearPeriod) {
        return item.id;
    }

    trackStudentById(index: number, item: Student) {
        return item.id;
    }

    trackManagerById(index: number, item: Manager) {
        return item.id;
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
