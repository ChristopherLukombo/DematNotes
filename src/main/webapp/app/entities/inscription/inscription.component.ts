import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Inscription } from './inscription.model';
import { InscriptionService } from './inscription.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-inscription',
    templateUrl: './inscription.component.html'
})
export class InscriptionComponent implements OnInit, OnDestroy {
inscriptions: Inscription[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inscriptionService: InscriptionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.inscriptionService.query().subscribe(
            (res: HttpResponse<Inscription[]>) => {
                this.inscriptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInscriptions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Inscription) {
        return item.id;
    }
    registerChangeInInscriptions() {
        this.eventSubscriber = this.eventManager.subscribe('inscriptionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
