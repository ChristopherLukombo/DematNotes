import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InterventionMySuffix } from './intervention-my-suffix.model';
import { InterventionMySuffixService } from './intervention-my-suffix.service';

@Component({
    selector: 'jhi-intervention-my-suffix-detail',
    templateUrl: './intervention-my-suffix-detail.component.html'
})
export class InterventionMySuffixDetailComponent implements OnInit, OnDestroy {

    intervention: InterventionMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private interventionService: InterventionMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInterventions();
    }

    load(id) {
        this.interventionService.find(id)
            .subscribe((interventionResponse: HttpResponse<InterventionMySuffix>) => {
                this.intervention = interventionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInterventions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'interventionListModification',
            (response) => this.load(this.intervention.id)
        );
    }
}
