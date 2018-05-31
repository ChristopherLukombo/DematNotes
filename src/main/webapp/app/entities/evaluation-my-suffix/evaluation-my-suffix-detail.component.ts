import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EvaluationMySuffix } from './evaluation-my-suffix.model';
import { EvaluationMySuffixService } from './evaluation-my-suffix.service';

@Component({
    selector: 'jhi-evaluation-my-suffix-detail',
    templateUrl: './evaluation-my-suffix-detail.component.html'
})
export class EvaluationMySuffixDetailComponent implements OnInit, OnDestroy {

    evaluation: EvaluationMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private evaluationService: EvaluationMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEvaluations();
    }

    load(id) {
        this.evaluationService.find(id)
            .subscribe((evaluationResponse: HttpResponse<EvaluationMySuffix>) => {
                this.evaluation = evaluationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEvaluations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'evaluationListModification',
            (response) => this.load(this.evaluation.id)
        );
    }
}
