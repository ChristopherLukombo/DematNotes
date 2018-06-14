import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DelayStudent } from './delay-student.model';
import { DelayStudentPopupService } from './delay-student-popup.service';
import { DelayStudentService } from './delay-student.service';

@Component({
    selector: 'jhi-delay-student-delete-dialog',
    templateUrl: './delay-student-delete-dialog.component.html'
})
export class DelayStudentDeleteDialogComponent {

    delayStudent: DelayStudent;

    constructor(
        private delayStudentService: DelayStudentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.delayStudentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'delayStudentListModification',
                content: 'Deleted an delayStudent'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delay-student-delete-popup',
    template: ''
})
export class DelayStudentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private delayStudentPopupService: DelayStudentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.delayStudentPopupService
                .open(DelayStudentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
