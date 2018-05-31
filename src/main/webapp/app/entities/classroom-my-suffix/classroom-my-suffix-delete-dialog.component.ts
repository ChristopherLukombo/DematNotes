import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { ClassroomMySuffixPopupService } from './classroom-my-suffix-popup.service';
import { ClassroomMySuffixService } from './classroom-my-suffix.service';

@Component({
    selector: 'jhi-classroom-my-suffix-delete-dialog',
    templateUrl: './classroom-my-suffix-delete-dialog.component.html'
})
export class ClassroomMySuffixDeleteDialogComponent {

    classroom: ClassroomMySuffix;

    constructor(
        private classroomService: ClassroomMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classroomService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'classroomListModification',
                content: 'Deleted an classroom'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-classroom-my-suffix-delete-popup',
    template: ''
})
export class ClassroomMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private classroomPopupService: ClassroomMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.classroomPopupService
                .open(ClassroomMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
