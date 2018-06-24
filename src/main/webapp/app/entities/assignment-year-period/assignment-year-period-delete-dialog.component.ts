import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AssignmentYearPeriod } from './assignment-year-period.model';
import { AssignmentYearPeriodPopupService } from './assignment-year-period-popup.service';
import { AssignmentYearPeriodService } from './assignment-year-period.service';

@Component({
    selector: 'jhi-assignment-year-period-delete-dialog',
    templateUrl: './assignment-year-period-delete-dialog.component.html'
})
export class AssignmentYearPeriodDeleteDialogComponent {

    assignmentYearPeriod: AssignmentYearPeriod;

    constructor(
        private assignmentYearPeriodService: AssignmentYearPeriodService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assignmentYearPeriodService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assignmentYearPeriodListModification',
                content: 'Deleted an assignmentYearPeriod'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assignment-year-period-delete-popup',
    template: ''
})
export class AssignmentYearPeriodDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assignmentYearPeriodPopupService: AssignmentYearPeriodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assignmentYearPeriodPopupService
                .open(AssignmentYearPeriodDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
