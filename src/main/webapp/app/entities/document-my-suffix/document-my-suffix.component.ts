import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentMySuffix } from './document-my-suffix.model';
import { DocumentMySuffixService } from './document-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-document-my-suffix',
    templateUrl: './document-my-suffix.component.html'
})
export class DocumentMySuffixComponent implements OnInit, OnDestroy {
documents: DocumentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private documentService: DocumentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.documentService.query().subscribe(
            (res: HttpResponse<DocumentMySuffix[]>) => {
                this.documents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentMySuffix) {
        return item.id;
    }
    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
