import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { School } from './school.model';
import { SchoolService } from './school.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-school',
    templateUrl: './school.component.html'
})
export class SchoolComponent implements OnInit, OnDestroy {
schools: School[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private schoolService: SchoolService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.schoolService.query().subscribe(
            (res: HttpResponse<School[]>) => {
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

    trackId(index: number, item: School) {
        return item.id;
    }
    registerChangeInSchools() {
        this.eventSubscriber = this.eventManager.subscribe('schoolListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
