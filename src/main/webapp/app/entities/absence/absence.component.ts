import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Absence } from './absence.model';
import { AbsenceService } from './absence.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-absence',
    templateUrl: './absence.component.html'
})
export class AbsenceComponent implements OnInit, OnDestroy {
absences: Absence[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private absenceService: AbsenceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.absenceService.query().subscribe(
            (res: HttpResponse<Absence[]>) => {
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

    trackId(index: number, item: Absence) {
        return item.id;
    }
    registerChangeInAbsences() {
        this.eventSubscriber = this.eventManager.subscribe('absenceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
