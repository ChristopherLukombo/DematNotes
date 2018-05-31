import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InterventionMySuffix } from './intervention-my-suffix.model';
import { InterventionMySuffixPopupService } from './intervention-my-suffix-popup.service';
import { InterventionMySuffixService } from './intervention-my-suffix.service';

@Component({
    selector: 'jhi-intervention-my-suffix-delete-dialog',
    templateUrl: './intervention-my-suffix-delete-dialog.component.html'
})
export class InterventionMySuffixDeleteDialogComponent {

    intervention: InterventionMySuffix;

    constructor(
        private interventionService: InterventionMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interventionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interventionListModification',
                content: 'Deleted an intervention'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-intervention-my-suffix-delete-popup',
    template: ''
})
export class InterventionMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interventionPopupService: InterventionMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.interventionPopupService
                .open(InterventionMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
