import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ManagerMySuffix } from './manager-my-suffix.model';
import { ManagerMySuffixService } from './manager-my-suffix.service';

@Component({
    selector: 'jhi-manager-my-suffix-detail',
    templateUrl: './manager-my-suffix-detail.component.html'
})
export class ManagerMySuffixDetailComponent implements OnInit, OnDestroy {

    manager: ManagerMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private managerService: ManagerMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInManagers();
    }

    load(id) {
        this.managerService.find(id)
            .subscribe((managerResponse: HttpResponse<ManagerMySuffix>) => {
                this.manager = managerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInManagers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'managerListModification',
            (response) => this.load(this.manager.id)
        );
    }
}
