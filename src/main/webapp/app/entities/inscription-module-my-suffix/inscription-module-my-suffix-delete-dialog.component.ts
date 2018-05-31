import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InscriptionModuleMySuffix } from './inscription-module-my-suffix.model';
import { InscriptionModuleMySuffixPopupService } from './inscription-module-my-suffix-popup.service';
import { InscriptionModuleMySuffixService } from './inscription-module-my-suffix.service';

@Component({
    selector: 'jhi-inscription-module-my-suffix-delete-dialog',
    templateUrl: './inscription-module-my-suffix-delete-dialog.component.html'
})
export class InscriptionModuleMySuffixDeleteDialogComponent {

    inscriptionModule: InscriptionModuleMySuffix;

    constructor(
        private inscriptionModuleService: InscriptionModuleMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inscriptionModuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'inscriptionModuleListModification',
                content: 'Deleted an inscriptionModule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inscription-module-my-suffix-delete-popup',
    template: ''
})
export class InscriptionModuleMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private inscriptionModulePopupService: InscriptionModuleMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.inscriptionModulePopupService
                .open(InscriptionModuleMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
