import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InscriptionModuleMySuffix } from './inscription-module-my-suffix.model';
import { InscriptionModuleMySuffixService } from './inscription-module-my-suffix.service';

@Component({
    selector: 'jhi-inscription-module-my-suffix-detail',
    templateUrl: './inscription-module-my-suffix-detail.component.html'
})
export class InscriptionModuleMySuffixDetailComponent implements OnInit, OnDestroy {

    inscriptionModule: InscriptionModuleMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inscriptionModuleService: InscriptionModuleMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInscriptionModules();
    }

    load(id) {
        this.inscriptionModuleService.find(id)
            .subscribe((inscriptionModuleResponse: HttpResponse<InscriptionModuleMySuffix>) => {
                this.inscriptionModule = inscriptionModuleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInscriptionModules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inscriptionModuleListModification',
            (response) => this.load(this.inscriptionModule.id)
        );
    }
}
