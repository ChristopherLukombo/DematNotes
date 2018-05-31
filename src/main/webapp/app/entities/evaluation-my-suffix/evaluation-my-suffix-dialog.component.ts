import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EvaluationMySuffix } from './evaluation-my-suffix.model';
import { EvaluationMySuffixPopupService } from './evaluation-my-suffix-popup.service';
import { EvaluationMySuffixService } from './evaluation-my-suffix.service';
import { ModuleMySuffix, ModuleMySuffixService } from '../module-my-suffix';
import { StudentMySuffix, StudentMySuffixService } from '../student-my-suffix';
import { SchoolReportMySuffix, SchoolReportMySuffixService } from '../school-report-my-suffix';

@Component({
    selector: 'jhi-evaluation-my-suffix-dialog',
    templateUrl: './evaluation-my-suffix-dialog.component.html'
})
export class EvaluationMySuffixDialogComponent implements OnInit {

    evaluation: EvaluationMySuffix;
    isSaving: boolean;

    modules: ModuleMySuffix[];

    students: StudentMySuffix[];

    schoolreports: SchoolReportMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private evaluationService: EvaluationMySuffixService,
        private moduleService: ModuleMySuffixService,
        private studentService: StudentMySuffixService,
        private schoolReportService: SchoolReportMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduleService.query()
            .subscribe((res: HttpResponse<ModuleMySuffix[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentMySuffix[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolReportService.query()
            .subscribe((res: HttpResponse<SchoolReportMySuffix[]>) => { this.schoolreports = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evaluation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.evaluationService.update(this.evaluation));
        } else {
            this.subscribeToSaveResponse(
                this.evaluationService.create(this.evaluation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EvaluationMySuffix>>) {
        result.subscribe((res: HttpResponse<EvaluationMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EvaluationMySuffix) {
        this.eventManager.broadcast({ name: 'evaluationListModification', content: 'OK'});
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

    trackSchoolReportById(index: number, item: SchoolReportMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-evaluation-my-suffix-popup',
    template: ''
})
export class EvaluationMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationPopupService: EvaluationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.evaluationPopupService
                    .open(EvaluationMySuffixDialogComponent as Component, params['id']);
            } else {
                this.evaluationPopupService
                    .open(EvaluationMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
