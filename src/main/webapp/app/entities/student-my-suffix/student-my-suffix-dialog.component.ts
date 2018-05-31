import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StudentMySuffix } from './student-my-suffix.model';
import { StudentMySuffixPopupService } from './student-my-suffix-popup.service';
import { StudentMySuffixService } from './student-my-suffix.service';
import { User, UserService } from '../../shared';
import { SchoolYearMySuffix, SchoolYearMySuffixService } from '../school-year-my-suffix';
import { ClassroomMySuffix, ClassroomMySuffixService } from '../classroom-my-suffix';
import { SchoolMySuffix, SchoolMySuffixService } from '../school-my-suffix';

@Component({
    selector: 'jhi-student-my-suffix-dialog',
    templateUrl: './student-my-suffix-dialog.component.html'
})
export class StudentMySuffixDialogComponent implements OnInit {

    student: StudentMySuffix;
    isSaving: boolean;

    users: User[];

    schoolyears: SchoolYearMySuffix[];

    classrooms: ClassroomMySuffix[];

    schools: SchoolMySuffix[];
    dateOfBirthDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private studentService: StudentMySuffixService,
        private userService: UserService,
        private schoolYearService: SchoolYearMySuffixService,
        private classroomService: ClassroomMySuffixService,
        private schoolService: SchoolMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolYearService.query()
            .subscribe((res: HttpResponse<SchoolYearMySuffix[]>) => { this.schoolyears = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.classroomService.query()
            .subscribe((res: HttpResponse<ClassroomMySuffix[]>) => { this.classrooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolService.query()
            .subscribe((res: HttpResponse<SchoolMySuffix[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.student.id !== undefined) {
            this.subscribeToSaveResponse(
                this.studentService.update(this.student));
        } else {
            this.subscribeToSaveResponse(
                this.studentService.create(this.student));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StudentMySuffix>>) {
        result.subscribe((res: HttpResponse<StudentMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StudentMySuffix) {
        this.eventManager.broadcast({ name: 'studentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackSchoolYearById(index: number, item: SchoolYearMySuffix) {
        return item.id;
    }

    trackClassroomById(index: number, item: ClassroomMySuffix) {
        return item.id;
    }

    trackSchoolById(index: number, item: SchoolMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-student-my-suffix-popup',
    template: ''
})
export class StudentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.studentPopupService
                    .open(StudentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.studentPopupService
                    .open(StudentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
