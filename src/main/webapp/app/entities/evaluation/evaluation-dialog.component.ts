import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evaluation } from './evaluation.model';
import { EvaluationPopupService } from './evaluation-popup.service';
import { EvaluationService } from './evaluation.service';
import { Student, StudentService } from '../student';
import { Module, ModuleService } from '../module';
import { SchoolReport, SchoolReportService } from '../school-report';

@Component({
    selector: 'jhi-evaluation-dialog',
    templateUrl: './evaluation-dialog.component.html'
})
export class EvaluationDialogComponent implements OnInit {

    evaluation: Evaluation;
    isSaving: boolean;

    students: Student[];

    modules: Module[];

    schoolreports: SchoolReport[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private evaluationService: EvaluationService,
        private studentService: StudentService,
        private moduleService: ModuleService,
        private schoolReportService: SchoolReportService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.studentService.query()
            .subscribe((res: HttpResponse<Student[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.moduleService.query()
            .subscribe((res: HttpResponse<Module[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolReportService.query()
            .subscribe((res: HttpResponse<SchoolReport[]>) => { this.schoolreports = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Evaluation>>) {
        result.subscribe((res: HttpResponse<Evaluation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Evaluation) {
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

    trackStudentById(index: number, item: Student) {
        return item.id;
    }

    trackModuleById(index: number, item: Module) {
        return item.id;
    }

    trackSchoolReportById(index: number, item: SchoolReport) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-evaluation-popup',
    template: ''
})
export class EvaluationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationPopupService: EvaluationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.evaluationPopupService
                    .open(EvaluationDialogComponent as Component, params['id']);
            } else {
                this.evaluationPopupService
                    .open(EvaluationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
