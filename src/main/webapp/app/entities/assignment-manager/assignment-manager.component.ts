import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssignmentManager } from './assignment-manager.model';
import { AssignmentManagerService } from './assignment-manager.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-assignment-manager',
    templateUrl: './assignment-manager.component.html'
})
export class AssignmentManagerComponent implements OnInit, OnDestroy {
assignmentManagers: AssignmentManager[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private assignmentManagerService: AssignmentManagerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.assignmentManagerService.query().subscribe(
            (res: HttpResponse<AssignmentManager[]>) => {
                this.assignmentManagers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAssignmentManagers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AssignmentManager) {
        return item.id;
    }
    registerChangeInAssignmentManagers() {
        this.eventSubscriber = this.eventManager.subscribe('assignmentManagerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
