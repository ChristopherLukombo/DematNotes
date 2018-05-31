import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EvaluationMySuffix } from './evaluation-my-suffix.model';
import { EvaluationMySuffixService } from './evaluation-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-evaluation-my-suffix',
    templateUrl: './evaluation-my-suffix.component.html'
})
export class EvaluationMySuffixComponent implements OnInit, OnDestroy {
evaluations: EvaluationMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private evaluationService: EvaluationMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.evaluationService.query().subscribe(
            (res: HttpResponse<EvaluationMySuffix[]>) => {
                this.evaluations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInEvaluations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EvaluationMySuffix) {
        return item.id;
    }
    registerChangeInEvaluations() {
        this.eventSubscriber = this.eventManager.subscribe('evaluationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
