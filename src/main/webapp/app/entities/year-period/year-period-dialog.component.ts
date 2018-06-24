import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YearPeriod } from './year-period.model';
import { YearPeriodPopupService } from './year-period-popup.service';
import { YearPeriodService } from './year-period.service';

@Component({
    selector: 'jhi-year-period-dialog',
    templateUrl: './year-period-dialog.component.html'
})
export class YearPeriodDialogComponent implements OnInit {

    yearPeriod: YearPeriod;
    isSaving: boolean;
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private yearPeriodService: YearPeriodService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.yearPeriod.id !== undefined) {
            this.subscribeToSaveResponse(
                this.yearPeriodService.update(this.yearPeriod));
        } else {
            this.subscribeToSaveResponse(
                this.yearPeriodService.create(this.yearPeriod));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<YearPeriod>>) {
        result.subscribe((res: HttpResponse<YearPeriod>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: YearPeriod) {
        this.eventManager.broadcast({ name: 'yearPeriodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-year-period-popup',
    template: ''
})
export class YearPeriodPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yearPeriodPopupService: YearPeriodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.yearPeriodPopupService
                    .open(YearPeriodDialogComponent as Component, params['id']);
            } else {
                this.yearPeriodPopupService
                    .open(YearPeriodDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
