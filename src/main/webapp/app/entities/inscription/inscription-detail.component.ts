import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Inscription } from './inscription.model';
import { InscriptionService } from './inscription.service';

@Component({
    selector: 'jhi-inscription-detail',
    templateUrl: './inscription-detail.component.html'
})
export class InscriptionDetailComponent implements OnInit, OnDestroy {

    inscription: Inscription;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inscriptionService: InscriptionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInscriptions();
    }

    load(id) {
        this.inscriptionService.find(id)
            .subscribe((inscriptionResponse: HttpResponse<Inscription>) => {
                this.inscription = inscriptionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInscriptions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inscriptionListModification',
            (response) => this.load(this.inscription.id)
        );
    }
}
