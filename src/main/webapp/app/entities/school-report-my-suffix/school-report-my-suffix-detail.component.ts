import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolReportMySuffix } from './school-report-my-suffix.model';
import { SchoolReportMySuffixService } from './school-report-my-suffix.service';

@Component({
    selector: 'jhi-school-report-my-suffix-detail',
    templateUrl: './school-report-my-suffix-detail.component.html'
})
export class SchoolReportMySuffixDetailComponent implements OnInit, OnDestroy {

    schoolReport: SchoolReportMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private schoolReportService: SchoolReportMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchoolReports();
    }

    load(id) {
        this.schoolReportService.find(id)
            .subscribe((schoolReportResponse: HttpResponse<SchoolReportMySuffix>) => {
                this.schoolReport = schoolReportResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchoolReports() {
        this.eventSubscriber = this.eventManager.subscribe(
            'schoolReportListModification',
            (response) => this.load(this.schoolReport.id)
        );
    }
}
