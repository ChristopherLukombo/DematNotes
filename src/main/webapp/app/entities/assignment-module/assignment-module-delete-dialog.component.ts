import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AssignmentModule } from './assignment-module.model';
import { AssignmentModulePopupService } from './assignment-module-popup.service';
import { AssignmentModuleService } from './assignment-module.service';

@Component({
    selector: 'jhi-assignment-module-delete-dialog',
    templateUrl: './assignment-module-delete-dialog.component.html'
})
export class AssignmentModuleDeleteDialogComponent {

    assignmentModule: AssignmentModule;

    constructor(
        private assignmentModuleService: AssignmentModuleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assignmentModuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assignmentModuleListModification',
                content: 'Deleted an assignmentModule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assignment-module-delete-popup',
    template: ''
})
export class AssignmentModuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assignmentModulePopupService: AssignmentModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assignmentModulePopupService
                .open(AssignmentModuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
