import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssignmentModule } from './assignment-module.model';
import { AssignmentModuleService } from './assignment-module.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-assignment-module',
    templateUrl: './assignment-module.component.html'
})
export class AssignmentModuleComponent implements OnInit, OnDestroy {
assignmentModules: AssignmentModule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private assignmentModuleService: AssignmentModuleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.assignmentModuleService.query().subscribe(
            (res: HttpResponse<AssignmentModule[]>) => {
                this.assignmentModules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAssignmentModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AssignmentModule) {
        return item.id;
    }
    registerChangeInAssignmentModules() {
        this.eventSubscriber = this.eventManager.subscribe('assignmentModuleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
