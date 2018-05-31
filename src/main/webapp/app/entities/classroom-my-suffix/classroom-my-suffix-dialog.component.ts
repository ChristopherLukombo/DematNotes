import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixPopupService } from './classroom-my-suffix-popup.service';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';

@Component({
    selector: 'jhi-classroom-my-suffix-dialog',
    templateUrl: './classroom-my-suffix-dialog.component.html'
})
export class ClassroomMySuffixDialogComponent implements OnInit {

    classroom: ClassroomMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private classroomService: ClassroomMySuffixService,
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
        if (this.classroom.id !== undefined) {
            this.subscribeToSaveResponse(
                this.classroomService.update(this.classroom));
        } else {
            this.subscribeToSaveResponse(
                this.classroomService.create(this.classroom));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClassroomMySuffix>>) {
        result.subscribe((res: HttpResponse<ClassroomMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClassroomMySuffix) {
        this.eventManager.broadcast({ name: 'classroomListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-classroom-my-suffix-popup',
    template: ''
})
export class ClassroomMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.classroomPopupService
                    .open(ClassroomMySuffixDialogComponent as Component, params['id']);
            } else {
                this.classroomPopupService
                    .open(ClassroomMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
