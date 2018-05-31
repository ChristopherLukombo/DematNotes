import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AbsenceMySuffix } from './absence-my-suffix.model';
import { AbsenceMySuffixService } from './absence-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-absence-my-suffix',
    templateUrl: './absence-my-suffix.component.html'
})
export class AbsenceMySuffixComponent implements OnInit, OnDestroy {
absences: AbsenceMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private absenceService: AbsenceMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.absenceService.query().subscribe(
            (res: HttpResponse<AbsenceMySuffix[]>) => {
                this.absences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAbsences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AbsenceMySuffix) {
        return item.id;
    }
    registerChangeInAbsences() {
        this.eventSubscriber = this.eventManager.subscribe('absenceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
