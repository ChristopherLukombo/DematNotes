import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssignmentModule } from './assignment-module.model';
import { AssignmentModulePopupService } from './assignment-module-popup.service';
import { AssignmentModuleService } from './assignment-module.service';
import { Classroom, ClassroomService } from '../classroom';
import { School, SchoolService } from '../school';
import { SchoolYear, SchoolYearService } from '../school-year';
import { Teacher, TeacherService } from '../teacher';
import { Module, ModuleService } from '../module';

@Component({
    selector: 'jhi-assignment-module-dialog',
    templateUrl: './assignment-module-dialog.component.html'
})
export class AssignmentModuleDialogComponent implements OnInit {

    assignmentModule: AssignmentModule;
    isSaving: boolean;

    classrooms: Classroom[];

    schools: School[];

    schoolyears: SchoolYear[];

    teachers: Teacher[];

    modules: Module[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assignmentModuleService: AssignmentModuleService,
        private classroomService: ClassroomService,
        private schoolService: SchoolService,
        private schoolYearService: SchoolYearService,
        private teacherService: TeacherService,
        private moduleService: ModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.classroomService.query()
            .subscribe((res: HttpResponse<Classroom[]>) => { this.classrooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolService.query()
            .subscribe((res: HttpResponse<School[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolYearService.query()
            .subscribe((res: HttpResponse<SchoolYear[]>) => { this.schoolyears = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.teacherService.query()
            .subscribe((res: HttpResponse<Teacher[]>) => { this.teachers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.moduleService.query()
            .subscribe((res: HttpResponse<Module[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assignmentModule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assignmentModuleService.update(this.assignmentModule));
        } else {
            this.subscribeToSaveResponse(
                this.assignmentModuleService.create(this.assignmentModule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AssignmentModule>>) {
        result.subscribe((res: HttpResponse<AssignmentModule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AssignmentModule) {
        this.eventManager.broadcast({ name: 'assignmentModuleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClassroomById(index: number, item: Classroom) {
        return item.id;
    }

    trackSchoolById(index: number, item: School) {
        return item.id;
    }

    trackSchoolYearById(index: number, item: SchoolYear) {
        return item.id;
    }

    trackTeacherById(index: number, item: Teacher) {
        return item.id;
    }

    trackModuleById(index: number, item: Module) {
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
    selector: 'jhi-assignment-module-popup',
    template: ''
})
export class AssignmentModulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assignmentModulePopupService: AssignmentModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assignmentModulePopupService
                    .open(AssignmentModuleDialogComponent as Component, params['id']);
            } else {
                this.assignmentModulePopupService
                    .open(AssignmentModuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
