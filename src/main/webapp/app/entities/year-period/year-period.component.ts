import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { YearPeriod } from './year-period.model';
import { YearPeriodService } from './year-period.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-year-period',
    templateUrl: './year-period.component.html'
})
export class YearPeriodComponent implements OnInit, OnDestroy {
yearPeriods: YearPeriod[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private yearPeriodService: YearPeriodService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.yearPeriodService.query().subscribe(
            (res: HttpResponse<YearPeriod[]>) => {
                this.yearPeriods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInYearPeriods();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: YearPeriod) {
        return item.id;
    }
    registerChangeInYearPeriods() {
        this.eventSubscriber = this.eventManager.subscribe('yearPeriodListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
