import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolReport } from './school-report.model';
import { SchoolReportService } from './school-report.service';

@Component({
    selector: 'jhi-school-report-detail',
    templateUrl: './school-report-detail.component.html'
})
export class SchoolReportDetailComponent implements OnInit, OnDestroy {

    schoolReport: SchoolReport;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private schoolReportService: SchoolReportService,
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
            .subscribe((schoolReportResponse: HttpResponse<SchoolReport>) => {
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
