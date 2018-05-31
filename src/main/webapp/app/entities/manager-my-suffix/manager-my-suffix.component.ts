import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ManagerMySuffix } from './manager-my-suffix.model';
import { ManagerMySuffixService } from './manager-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-manager-my-suffix',
    templateUrl: './manager-my-suffix.component.html'
})
export class ManagerMySuffixComponent implements OnInit, OnDestroy {
managers: ManagerMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private managerService: ManagerMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.managerService.query().subscribe(
            (res: HttpResponse<ManagerMySuffix[]>) => {
                this.managers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInManagers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ManagerMySuffix) {
        return item.id;
    }
    registerChangeInManagers() {
        this.eventSubscriber = this.eventManager.subscribe('managerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
