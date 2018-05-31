import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DelayStudentMySuffix } from './delay-student-my-suffix.model';
import { DelayStudentMySuffixPopupService } from './delay-student-my-suffix-popup.service';
import { DelayStudentMySuffixService } from './delay-student-my-suffix.service';

@Component({
    selector: 'jhi-delay-student-my-suffix-delete-dialog',
    templateUrl: './delay-student-my-suffix-delete-dialog.component.html'
})
export class DelayStudentMySuffixDeleteDialogComponent {

    delayStudent: DelayStudentMySuffix;

    constructor(
        private delayStudentService: DelayStudentMySuffixService,
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
    selector: 'jhi-delay-student-my-suffix-delete-popup',
    template: ''
})
export class DelayStudentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private delayStudentPopupService: DelayStudentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.delayStudentPopupService
                .open(DelayStudentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
