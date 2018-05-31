import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DelayStudentMySuffix } from './delay-student-my-suffix.model';
import { DelayStudentMySuffixService } from './delay-student-my-suffix.service';

@Component({
    selector: 'jhi-delay-student-my-suffix-detail',
    templateUrl: './delay-student-my-suffix-detail.component.html'
})
export class DelayStudentMySuffixDetailComponent implements OnInit, OnDestroy {

    delayStudent: DelayStudentMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private delayStudentService: DelayStudentMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDelayStudents();
    }

    load(id) {
        this.delayStudentService.find(id)
            .subscribe((delayStudentResponse: HttpResponse<DelayStudentMySuffix>) => {
                this.delayStudent = delayStudentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDelayStudents() {
        this.eventSubscriber = this.eventManager.subscribe(
            'delayStudentListModification',
            (response) => this.load(this.delayStudent.id)
        );
    }
}
