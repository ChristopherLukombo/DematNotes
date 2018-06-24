import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AssignmentManager } from './assignment-manager.model';
import { AssignmentManagerService } from './assignment-manager.service';

@Component({
    selector: 'jhi-assignment-manager-detail',
    templateUrl: './assignment-manager-detail.component.html'
})
export class AssignmentManagerDetailComponent implements OnInit, OnDestroy {

    assignmentManager: AssignmentManager;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assignmentManagerService: AssignmentManagerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssignmentManagers();
    }

    load(id) {
        this.assignmentManagerService.find(id)
            .subscribe((assignmentManagerResponse: HttpResponse<AssignmentManager>) => {
                this.assignmentManager = assignmentManagerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssignmentManagers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assignmentManagerListModification',
            (response) => this.load(this.assignmentManager.id)
        );
    }
}
