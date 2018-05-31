import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolMySuffix } from './school-my-suffix.model';
import { SchoolMySuffixPopupService } from './school-my-suffix-popup.service';
import { SchoolMySuffixService } from './school-my-suffix.service';

@Component({
    selector: 'jhi-school-my-suffix-dialog',
    templateUrl: './school-my-suffix-dialog.component.html'
})
export class SchoolMySuffixDialogComponent implements OnInit {

    school: SchoolMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private schoolService: SchoolMySuffixService,
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
        if (this.school.id !== undefined) {
            this.subscribeToSaveResponse(
                this.schoolService.update(this.school));
        } else {
            this.subscribeToSaveResponse(
                this.schoolService.create(this.school));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SchoolMySuffix>>) {
        result.subscribe((res: HttpResponse<SchoolMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SchoolMySuffix) {
        this.eventManager.broadcast({ name: 'schoolListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-school-my-suffix-popup',
    template: ''
})
export class SchoolMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolPopupService: SchoolMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.schoolPopupService
                    .open(SchoolMySuffixDialogComponent as Component, params['id']);
            } else {
                this.schoolPopupService
                    .open(SchoolMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
