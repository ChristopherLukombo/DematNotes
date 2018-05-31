import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ManagerMySuffix } from './manager-my-suffix.model';
import { ManagerMySuffixPopupService } from './manager-my-suffix-popup.service';
import { ManagerMySuffixService } from './manager-my-suffix.service';

@Component({
    selector: 'jhi-manager-my-suffix-delete-dialog',
    templateUrl: './manager-my-suffix-delete-dialog.component.html'
})
export class ManagerMySuffixDeleteDialogComponent {

    manager: ManagerMySuffix;

    constructor(
        private managerService: ManagerMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.managerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'managerListModification',
                content: 'Deleted an manager'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-manager-my-suffix-delete-popup',
    template: ''
})
export class ManagerMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private managerPopupService: ManagerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.managerPopupService
                .open(ManagerMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
