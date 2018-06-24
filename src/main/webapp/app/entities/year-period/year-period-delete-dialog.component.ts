import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { YearPeriod } from './year-period.model';
import { YearPeriodPopupService } from './year-period-popup.service';
import { YearPeriodService } from './year-period.service';

@Component({
    selector: 'jhi-year-period-delete-dialog',
    templateUrl: './year-period-delete-dialog.component.html'
})
export class YearPeriodDeleteDialogComponent {

    yearPeriod: YearPeriod;

    constructor(
        private yearPeriodService: YearPeriodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.yearPeriodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'yearPeriodListModification',
                content: 'Deleted an yearPeriod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-year-period-delete-popup',
    template: ''
})
export class YearPeriodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private yearPeriodPopupService: YearPeriodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.yearPeriodPopupService
                .open(YearPeriodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
