import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-classroom-my-suffix',
    templateUrl: './classroom-my-suffix.component.html'
})
export class ClassroomMySuffixComponent implements OnInit, OnDestroy {
classrooms: ClassroomMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private classroomService: ClassroomMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.classroomService.query().subscribe(
            (res: HttpResponse<ClassroomMySuffix[]>) => {
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

    trackId(index: number, item: ClassroomMySuffix) {
        return item.id;
    }
    registerChangeInClassrooms() {
        this.eventSubscriber = this.eventManager.subscribe('classroomListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
