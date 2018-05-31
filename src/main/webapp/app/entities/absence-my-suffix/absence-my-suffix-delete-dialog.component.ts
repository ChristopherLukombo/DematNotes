import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AbsenceMySuffix } from './absence-my-suffix.model';
import { AbsenceMySuffixPopupService } from './absence-my-suffix-popup.service';
import { AbsenceMySuffixService } from './absence-my-suffix.service';

@Component({
    selector: 'jhi-absence-my-suffix-delete-dialog',
    templateUrl: './absence-my-suffix-delete-dialog.component.html'
})
export class AbsenceMySuffixDeleteDialogComponent {

    absence: AbsenceMySuffix;

    constructor(
        private absenceService: AbsenceMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.absenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'absenceListModification',
                content: 'Deleted an absence'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-absence-my-suffix-delete-popup',
    template: ''
})
export class AbsenceMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private absencePopupService: AbsenceMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.absencePopupService
                .open(AbsenceMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
