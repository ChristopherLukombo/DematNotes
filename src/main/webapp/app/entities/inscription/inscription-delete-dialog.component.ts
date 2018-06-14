import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Inscription } from './inscription.model';
import { InscriptionPopupService } from './inscription-popup.service';
import { InscriptionService } from './inscription.service';

@Component({
    selector: 'jhi-inscription-delete-dialog',
    templateUrl: './inscription-delete-dialog.component.html'
})
export class InscriptionDeleteDialogComponent {

    inscription: Inscription;

    constructor(
        private inscriptionService: InscriptionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inscriptionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inscriptionListModification',
                content: 'Deleted an inscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inscription-delete-popup',
    template: ''
})
export class InscriptionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscriptionPopupService: InscriptionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inscriptionPopupService
                .open(InscriptionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
