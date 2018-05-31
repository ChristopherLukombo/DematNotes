import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolYearMySuffix } from './school-year-my-suffix.model';
import { SchoolYearMySuffixService } from './school-year-my-suffix.service';

@Component({
    selector: 'jhi-school-year-my-suffix-detail',
    templateUrl: './school-year-my-suffix-detail.component.html'
})
export class SchoolYearMySuffixDetailComponent implements OnInit, OnDestroy {

    schoolYear: SchoolYearMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private schoolYearService: SchoolYearMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchoolYears();
    }

    load(id) {
        this.schoolYearService.find(id)
            .subscribe((schoolYearResponse: HttpResponse<SchoolYearMySuffix>) => {
                this.schoolYear = schoolYearResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchoolYears() {
        this.eventSubscriber = this.eventManager.subscribe(
            'schoolYearListModification',
            (response) => this.load(this.schoolYear.id)
        );
    }
}
