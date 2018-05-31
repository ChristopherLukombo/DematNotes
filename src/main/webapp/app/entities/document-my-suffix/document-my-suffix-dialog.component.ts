import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentMySuffix } from './document-my-suffix.model';
import { DocumentMySuffixPopupService } from './document-my-suffix-popup.service';
import { DocumentMySuffixService } from './document-my-suffix.service';
import { StudentMySuffix, StudentMySuffixService } from '../student-my-suffix';

@Component({
    selector: 'jhi-document-my-suffix-dialog',
    templateUrl: './document-my-suffix-dialog.component.html'
})
export class DocumentMySuffixDialogComponent implements OnInit {

    document: DocumentMySuffix;
    isSaving: boolean;

    students: StudentMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentService: DocumentMySuffixService,
        private studentService: StudentMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.studentService.query()
            .subscribe((res: HttpResponse<StudentMySuffix[]>) => { this.students = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(
                this.documentService.create(this.document));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentMySuffix>>) {
        result.subscribe((res: HttpResponse<DocumentMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentMySuffix) {
        this.eventManager.broadcast({ name: 'documentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStudentById(index: number, item: StudentMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-document-my-suffix-popup',
    template: ''
})
export class DocumentMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentPopupService
                    .open(DocumentMySuffixDialogComponent as Component, params['id']);
            } else {
                this.documentPopupService
                    .open(DocumentMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
