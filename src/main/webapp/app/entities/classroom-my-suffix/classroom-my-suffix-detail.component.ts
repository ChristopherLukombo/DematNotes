import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';

@Component({
    selector: 'jhi-classroom-my-suffix-detail',
    templateUrl: './classroom-my-suffix-detail.component.html'
})
export class ClassroomMySuffixDetailComponent implements OnInit, OnDestroy {

    classroom: ClassroomMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private classroomService: ClassroomMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClassrooms();
    }

    load(id) {
        this.classroomService.find(id)
            .subscribe((classroomResponse: HttpResponse<ClassroomMySuffix>) => {
                this.classroom = classroomResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe(
            'classroomListModification',
            (response) => this.load(this.classroom.id)
        );
    }
}
