import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentMySuffix } from './document-my-suffix.model';
import { DocumentMySuffixService } from './document-my-suffix.service';

@Component({
    selector: 'jhi-document-my-suffix-detail',
    templateUrl: './document-my-suffix-detail.component.html'
})
export class DocumentMySuffixDetailComponent implements OnInit, OnDestroy {

    document: DocumentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentService: DocumentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocuments();
    }

    load(id) {
        this.documentService.find(id)
            .subscribe((documentResponse: HttpResponse<DocumentMySuffix>) => {
                this.document = documentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentListModification',
            (response) => this.load(this.document.id)
        );
    }
}
