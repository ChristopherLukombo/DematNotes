import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SchoolReportMySuffix } from './school-report-my-suffix.model';
import { SchoolReportMySuffixService } from './school-report-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-school-report-my-suffix',
    templateUrl: './school-report-my-suffix.component.html'
})
export class SchoolReportMySuffixComponent implements OnInit, OnDestroy {
schoolReports: SchoolReportMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private schoolReportService: SchoolReportMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.schoolReportService.query().subscribe(
            (res: HttpResponse<SchoolReportMySuffix[]>) => {
                this.schoolReports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchoolReports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SchoolReportMySuffix) {
        return item.id;
    }
    registerChangeInSchoolReports() {
        this.eventSubscriber = this.eventManager.subscribe('schoolReportListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
