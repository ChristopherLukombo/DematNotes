import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Intervention } from './intervention.model';
import { InterventionService } from './intervention.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-intervention',
    templateUrl: './intervention.component.html'
})
export class InterventionComponent implements OnInit, OnDestroy {
interventions: Intervention[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private interventionService: InterventionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.interventionService.query().subscribe(
            (res: HttpResponse<Intervention[]>) => {
                this.interventions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInterventions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Intervention) {
        return item.id;
    }
    registerChangeInInterventions() {
        this.eventSubscriber = this.eventManager.subscribe('interventionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
