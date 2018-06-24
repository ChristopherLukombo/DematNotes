import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AssignmentYearPeriod } from './assignment-year-period.model';
import { AssignmentYearPeriodService } from './assignment-year-period.service';

@Component({
    selector: 'jhi-assignment-year-period-detail',
    templateUrl: './assignment-year-period-detail.component.html'
})
export class AssignmentYearPeriodDetailComponent implements OnInit, OnDestroy {

    assignmentYearPeriod: AssignmentYearPeriod;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assignmentYearPeriodService: AssignmentYearPeriodService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssignmentYearPeriods();
    }

    load(id) {
        this.assignmentYearPeriodService.find(id)
            .subscribe((assignmentYearPeriodResponse: HttpResponse<AssignmentYearPeriod>) => {
                this.assignmentYearPeriod = assignmentYearPeriodResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssignmentYearPeriods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assignmentYearPeriodListModification',
            (response) => this.load(this.assignmentYearPeriod.id)
        );
    }
}
