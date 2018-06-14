import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Intervention } from './intervention.model';
import { InterventionService } from './intervention.service';

@Component({
    selector: 'jhi-intervention-detail',
    templateUrl: './intervention-detail.component.html'
})
export class InterventionDetailComponent implements OnInit, OnDestroy {

    intervention: Intervention;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private interventionService: InterventionService,
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
            .subscribe((interventionResponse: HttpResponse<Intervention>) => {
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
