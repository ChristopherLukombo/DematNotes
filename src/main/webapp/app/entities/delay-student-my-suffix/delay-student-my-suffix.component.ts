import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DelayStudentMySuffix } from './delay-student-my-suffix.model';
import { DelayStudentMySuffixService } from './delay-student-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-delay-student-my-suffix',
    templateUrl: './delay-student-my-suffix.component.html'
})
export class DelayStudentMySuffixComponent implements OnInit, OnDestroy {
delayStudents: DelayStudentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private delayStudentService: DelayStudentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.delayStudentService.query().subscribe(
            (res: HttpResponse<DelayStudentMySuffix[]>) => {
                this.delayStudents = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDelayStudents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DelayStudentMySuffix) {
        return item.id;
    }
    registerChangeInDelayStudents() {
        this.eventSubscriber = this.eventManager.subscribe('delayStudentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
