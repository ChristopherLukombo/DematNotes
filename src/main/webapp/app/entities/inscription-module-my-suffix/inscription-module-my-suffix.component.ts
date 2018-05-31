import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InscriptionModuleMySuffix } from './inscription-module-my-suffix.model';
import { InscriptionModuleMySuffixService } from './inscription-module-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-inscription-module-my-suffix',
    templateUrl: './inscription-module-my-suffix.component.html'
})
export class InscriptionModuleMySuffixComponent implements OnInit, OnDestroy {
inscriptionModules: InscriptionModuleMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inscriptionModuleService: InscriptionModuleMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.inscriptionModuleService.query().subscribe(
            (res: HttpResponse<InscriptionModuleMySuffix[]>) => {
                this.inscriptionModules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInscriptionModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InscriptionModuleMySuffix) {
        return item.id;
    }
    registerChangeInInscriptionModules() {
        this.eventSubscriber = this.eventManager.subscribe('inscriptionModuleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
