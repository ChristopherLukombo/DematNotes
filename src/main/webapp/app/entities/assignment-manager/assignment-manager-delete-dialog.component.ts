import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AssignmentManager } from './assignment-manager.model';
import { AssignmentManagerPopupService } from './assignment-manager-popup.service';
import { AssignmentManagerService } from './assignment-manager.service';

@Component({
    selector: 'jhi-assignment-manager-delete-dialog',
    templateUrl: './assignment-manager-delete-dialog.component.html'
})
export class AssignmentManagerDeleteDialogComponent {

    assignmentManager: AssignmentManager;

    constructor(
        private assignmentManagerService: AssignmentManagerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assignmentManagerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assignmentManagerListModification',
                content: 'Deleted an assignmentManager'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assignment-manager-delete-popup',
    template: ''
})
export class AssignmentManagerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assignmentManagerPopupService: AssignmentManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assignmentManagerPopupService
                .open(AssignmentManagerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
