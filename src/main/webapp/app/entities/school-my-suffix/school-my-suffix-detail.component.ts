import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolMySuffix } from './school-my-suffix.model';
import { SchoolMySuffixService } from './school-my-suffix.service';

@Component({
    selector: 'jhi-school-my-suffix-detail',
    templateUrl: './school-my-suffix-detail.component.html'
})
export class SchoolMySuffixDetailComponent implements OnInit, OnDestroy {

    school: SchoolMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private schoolService: SchoolMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSchools();
    }

    load(id) {
        this.schoolService.find(id)
            .subscribe((schoolResponse: HttpResponse<SchoolMySuffix>) => {
                this.school = schoolResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSchools() {
        this.eventSubscriber = this.eventManager.subscribe(
            'schoolListModification',
            (response) => this.load(this.school.id)
        );
    }
}
