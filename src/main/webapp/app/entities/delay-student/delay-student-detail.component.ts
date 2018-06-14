import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DelayStudent } from './delay-student.model';
import { DelayStudentService } from './delay-student.service';

@Component({
    selector: 'jhi-delay-student-detail',
    templateUrl: './delay-student-detail.component.html'
})
export class DelayStudentDetailComponent implements OnInit, OnDestroy {

    delayStudent: DelayStudent;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private delayStudentService: DelayStudentService,
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
            .subscribe((delayStudentResponse: HttpResponse<DelayStudent>) => {
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
