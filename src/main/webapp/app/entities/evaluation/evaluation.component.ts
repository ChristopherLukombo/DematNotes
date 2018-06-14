import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Evaluation } from './evaluation.model';
import { EvaluationService } from './evaluation.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-evaluation',
    templateUrl: './evaluation.component.html'
})
export class EvaluationComponent implements OnInit, OnDestroy {
evaluations: Evaluation[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private evaluationService: EvaluationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.evaluationService.query().subscribe(
            (res: HttpResponse<Evaluation[]>) => {
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

    trackId(index: number, item: Evaluation) {
        return item.id;
    }
    registerChangeInEvaluations() {
        this.eventSubscriber = this.eventManager.subscribe('evaluationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
