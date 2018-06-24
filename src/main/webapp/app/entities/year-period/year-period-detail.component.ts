import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { YearPeriod } from './year-period.model';
import { YearPeriodService } from './year-period.service';

@Component({
    selector: 'jhi-year-period-detail',
    templateUrl: './year-period-detail.component.html'
})
export class YearPeriodDetailComponent implements OnInit, OnDestroy {

    yearPeriod: YearPeriod;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private yearPeriodService: YearPeriodService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInYearPeriods();
    }

    load(id) {
        this.yearPeriodService.find(id)
            .subscribe((yearPeriodResponse: HttpResponse<YearPeriod>) => {
                this.yearPeriod = yearPeriodResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInYearPeriods() {
        this.eventSubscriber = this.eventManager.subscribe(
            'yearPeriodListModification',
            (response) => this.load(this.yearPeriod.id)
        );
    }
}
