import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolYear } from './school-year.model';
import { SchoolYearService } from './school-year.service';

@Component({
    selector: 'jhi-school-year-detail',
    templateUrl: './school-year-detail.component.html'
})
export class SchoolYearDetailComponent implements OnInit, OnDestroy {

    schoolYear: SchoolYear;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private schoolYearService: SchoolYearService,
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
            .subscribe((schoolYearResponse: HttpResponse<SchoolYear>) => {
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
