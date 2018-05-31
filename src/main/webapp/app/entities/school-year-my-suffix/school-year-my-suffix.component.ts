import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SchoolYearMySuffix } from './school-year-my-suffix.model';
import { SchoolYearMySuffixService } from './school-year-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-school-year-my-suffix',
    templateUrl: './school-year-my-suffix.component.html'
})
export class SchoolYearMySuffixComponent implements OnInit, OnDestroy {
schoolYears: SchoolYearMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private schoolYearService: SchoolYearMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.schoolYearService.query().subscribe(
            (res: HttpResponse<SchoolYearMySuffix[]>) => {
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

    trackId(index: number, item: SchoolYearMySuffix) {
        return item.id;
    }
    registerChangeInSchoolYears() {
        this.eventSubscriber = this.eventManager.subscribe('schoolYearListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
