import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Intervention } from './intervention.model';
import { InterventionPopupService } from './intervention-popup.service';
import { InterventionService } from './intervention.service';

@Component({
    selector: 'jhi-intervention-delete-dialog',
    templateUrl: './intervention-delete-dialog.component.html'
})
export class InterventionDeleteDialogComponent {

    intervention: Intervention;

    constructor(
        private interventionService: InterventionService,
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
    selector: 'jhi-intervention-delete-popup',
    template: ''
})
export class InterventionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interventionPopupService: InterventionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.interventionPopupService
                .open(InterventionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
