import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ModuleMySuffix } from './module-my-suffix.model';
import { ModuleMySuffixPopupService } from './module-my-suffix-popup.service';
import { ModuleMySuffixService } from './module-my-suffix.service';
import { CourseMySuffix, CourseMySuffixService } from '../course-my-suffix';
import { SchoolMySuffix, SchoolMySuffixService } from '../school-my-suffix';

@Component({
    selector: 'jhi-module-my-suffix-dialog',
    templateUrl: './module-my-suffix-dialog.component.html'
})
export class ModuleMySuffixDialogComponent implements OnInit {

    module: ModuleMySuffix;
    isSaving: boolean;

    courses: CourseMySuffix[];

    schools: SchoolMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private moduleService: ModuleMySuffixService,
        private courseService: CourseMySuffixService,
        private schoolService: SchoolMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.courseService.query()
            .subscribe((res: HttpResponse<CourseMySuffix[]>) => { this.courses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.schoolService.query()
            .subscribe((res: HttpResponse<SchoolMySuffix[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.module.id !== undefined) {
            this.subscribeToSaveResponse(
                this.moduleService.update(this.module));
        } else {
            this.subscribeToSaveResponse(
                this.moduleService.create(this.module));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ModuleMySuffix>>) {
        result.subscribe((res: HttpResponse<ModuleMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ModuleMySuffix) {
        this.eventManager.broadcast({ name: 'moduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCourseById(index: number, item: CourseMySuffix) {
        return item.id;
    }

    trackSchoolById(index: number, item: SchoolMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-module-my-suffix-popup',
    template: ''
})
export class ModuleMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modulePopupService: ModuleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modulePopupService
                    .open(ModuleMySuffixDialogComponent as Component, params['id']);
            } else {
                this.modulePopupService
                    .open(ModuleMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
