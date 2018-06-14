import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolReport } from './school-report.model';
import { SchoolReportPopupService } from './school-report-popup.service';
import { SchoolReportService } from './school-report.service';

@Component({
    selector: 'jhi-school-report-delete-dialog',
    templateUrl: './school-report-delete-dialog.component.html'
})
export class SchoolReportDeleteDialogComponent {

    schoolReport: SchoolReport;

    constructor(
        private schoolReportService: SchoolReportService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schoolReportService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'schoolReportListModification',
                content: 'Deleted an schoolReport'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-school-report-delete-popup',
    template: ''
})
export class SchoolReportDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolReportPopupService: SchoolReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.schoolReportPopupService
                .open(SchoolReportDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
