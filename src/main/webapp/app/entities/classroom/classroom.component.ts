import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Classroom } from './classroom.model';
import { ClassroomService } from './classroom.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-classroom',
    templateUrl: './classroom.component.html'
})
export class ClassroomComponent implements OnInit, OnDestroy {
classrooms: Classroom[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classroomService: ClassroomService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.classroomService.query().subscribe(
            (res: HttpResponse<Classroom[]>) => {
                this.classrooms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClassrooms();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Classroom) {
        return item.id;
    }
    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe('classroomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
