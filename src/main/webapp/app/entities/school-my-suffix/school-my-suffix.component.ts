import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SchoolMySuffix } from './school-my-suffix.model';
import { SchoolMySuffixService } from './school-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-school-my-suffix',
    templateUrl: './school-my-suffix.component.html'
})
export class SchoolMySuffixComponent implements OnInit, OnDestroy {
schools: SchoolMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private schoolService: SchoolMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.schoolService.query().subscribe(
            (res: HttpResponse<SchoolMySuffix[]>) => {
                this.schools = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSchools();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SchoolMySuffix) {
        return item.id;
    }
    registerChangeInSchools() {
        this.eventSubscriber = this.eventManager.subscribe('schoolListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
