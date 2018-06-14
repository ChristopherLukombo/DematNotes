import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SchoolYear } from './school-year.model';
import { SchoolYearService } from './school-year.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-school-year',
    templateUrl: './school-year.component.html'
})
export class SchoolYearComponent implements OnInit, OnDestroy {
schoolYears: SchoolYear[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private schoolYearService: SchoolYearService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.schoolYearService.query().subscribe(
            (res: HttpResponse<SchoolYear[]>) => {
                this.schoolYears = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchoolYears();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SchoolYear) {
        return item.id;
    }
    registerChangeInSchoolYears() {
        this.eventSubscriber = this.eventManager.subscribe('schoolYearListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
