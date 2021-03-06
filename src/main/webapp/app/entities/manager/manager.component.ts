import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Manager } from './manager.model';
import { ManagerService } from './manager.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-manager',
    templateUrl: './manager.component.html'
})
export class ManagerComponent implements OnInit, OnDestroy {
managers: Manager[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private managerService: ManagerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.managerService.query().subscribe(
            (res: HttpResponse<Manager[]>) => {
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

    trackId(index: number, item: Manager) {
        return item.id;
    }
    registerChangeInManagers() {
        this.eventSubscriber = this.eventManager.subscribe('managerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
