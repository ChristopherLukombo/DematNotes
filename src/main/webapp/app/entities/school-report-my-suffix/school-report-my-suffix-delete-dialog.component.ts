import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolReportMySuffix } from './school-report-my-suffix.model';
import { SchoolReportMySuffixPopupService } from './school-report-my-suffix-popup.service';
import { SchoolReportMySuffixService } from './school-report-my-suffix.service';

@Component({
    selector: 'jhi-school-report-my-suffix-delete-dialog',
    templateUrl: './school-report-my-suffix-delete-dialog.component.html'
})
export class SchoolReportMySuffixDeleteDialogComponent {

    schoolReport: SchoolReportMySuffix;

    constructor(
        private schoolReportService: SchoolReportMySuffixService,
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
    selector: 'jhi-school-report-my-suffix-delete-popup',
    template: ''
})
export class SchoolReportMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolReportPopupService: SchoolReportMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.schoolReportPopupService
                .open(SchoolReportMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
