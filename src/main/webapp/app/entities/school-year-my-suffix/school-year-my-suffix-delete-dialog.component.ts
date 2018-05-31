import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SchoolYearMySuffix } from './school-year-my-suffix.model';
import { SchoolYearMySuffixPopupService } from './school-year-my-suffix-popup.service';
import { SchoolYearMySuffixService } from './school-year-my-suffix.service';

@Component({
    selector: 'jhi-school-year-my-suffix-delete-dialog',
    templateUrl: './school-year-my-suffix-delete-dialog.component.html'
})
export class SchoolYearMySuffixDeleteDialogComponent {

    schoolYear: SchoolYearMySuffix;

    constructor(
        private schoolYearService: SchoolYearMySuffixService,
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
    selector: 'jhi-school-year-my-suffix-delete-popup',
    template: ''
})
export class SchoolYearMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private schoolYearPopupService: SchoolYearMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.schoolYearPopupService
                .open(SchoolYearMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
