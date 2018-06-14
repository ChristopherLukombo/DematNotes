import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Teacher } from './teacher.model';
import { TeacherPopupService } from './teacher-popup.service';
import { TeacherService } from './teacher.service';
import { User, UserService } from '../../shared';
import { Module, ModuleService } from '../module';

@Component({
    selector: 'jhi-teacher-dialog',
    templateUrl: './teacher-dialog.component.html'
})
export class TeacherDialogComponent implements OnInit {

    teacher: Teacher;
    isSaving: boolean;

    users: User[];

    modules: Module[];
    dateOfBirthDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private teacherService: TeacherService,
        private userService: UserService,
        private moduleService: ModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.moduleService.query()
            .subscribe((res: HttpResponse<Module[]>) => { this.modules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(
                this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(
                this.teacherService.create(this.teacher));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Teacher>>) {
        result.subscribe((res: HttpResponse<Teacher>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Teacher) {
        this.eventManager.broadcast({ name: 'teacherListModification', content: 'OK'});
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

    trackModuleById(index: number, item: Module) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-teacher-popup',
    template: ''
})
export class TeacherPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private teacherPopupService: TeacherPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.teacherPopupService
                    .open(TeacherDialogComponent as Component, params['id']);
            } else {
                this.teacherPopupService
                    .open(TeacherDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
