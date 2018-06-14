import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolYear } from './school-year.model';
import { SchoolYearPopupService } from './school-year-popup.service';
import { SchoolYearService } from './school-year.service';

@Component({
    selector: 'jhi-school-year-delete-dialog',
    templateUrl: './school-year-delete-dialog.component.html'
})
export class SchoolYearDeleteDialogComponent {

    schoolYear: SchoolYear;

    constructor(
        private schoolYearService: SchoolYearService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.schoolYearService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'schoolYearListModification',
                content: 'Deleted an schoolYear'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-school-year-delete-popup',
    template: ''
})
export class SchoolYearDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolYearPopupService: SchoolYearPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.schoolYearPopupService
                .open(SchoolYearDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
