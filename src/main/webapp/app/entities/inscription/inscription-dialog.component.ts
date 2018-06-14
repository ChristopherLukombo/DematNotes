import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inscription } from './inscription.model';
import { InscriptionPopupService } from './inscription-popup.service';
import { InscriptionService } from './inscription.service';
import { School, SchoolService } from '../school';
import { Classroom, ClassroomService } from '../classroom';
import { SchoolYear, SchoolYearService } from '../school-year';
import { Student, StudentService } from '../student';

@Component({
    selector: 'jhi-inscription-dialog',
    templateUrl: './inscription-dialog.component.html'
})
export class InscriptionDialogComponent implements OnInit {

    inscription: Inscription;
    isSaving: boolean;

    schools: School[];

    classrooms: Classroom[];

    schoolyears: SchoolYear[];

    students: Student[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private inscriptionService: InscriptionService,
        private schoolService: SchoolService,
        private classroomService: ClassroomService,
        private schoolYearService: SchoolYearService,
        private studentService: StudentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.schoolService.query()
            .subscribe((res: HttpResponse<School[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.classroomService.query()
            .subscribe((res: HttpResponse<Classroom[]>) => { this.classrooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolYearService.query()
            .subscribe((res: HttpResponse<SchoolYear[]>) => { this.schoolyears = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.studentService.query()
            .subscribe((res: HttpResponse<Student[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.inscription.id !== undefined) {
            this.subscribeToSaveResponse(
                this.inscriptionService.update(this.inscription));
        } else {
            this.subscribeToSaveResponse(
                this.inscriptionService.create(this.inscription));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Inscription>>) {
        result.subscribe((res: HttpResponse<Inscription>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Inscription) {
        this.eventManager.broadcast({ name: 'inscriptionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSchoolById(index: number, item: School) {
        return item.id;
    }

    trackClassroomById(index: number, item: Classroom) {
        return item.id;
    }

    trackSchoolYearById(index: number, item: SchoolYear) {
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
    selector: 'jhi-inscription-popup',
    template: ''
})
export class InscriptionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscriptionPopupService: InscriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.inscriptionPopupService
                    .open(InscriptionDialogComponent as Component, params['id']);
            } else {
                this.inscriptionPopupService
                    .open(InscriptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
