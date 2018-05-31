import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StudentMySuffix } from './student-my-suffix.model';
import { StudentMySuffixPopupService } from './student-my-suffix-popup.service';
import { StudentMySuffixService } from './student-my-suffix.service';

@Component({
    selector: 'jhi-student-my-suffix-delete-dialog',
    templateUrl: './student-my-suffix-delete-dialog.component.html'
})
export class StudentMySuffixDeleteDialogComponent {

    student: StudentMySuffix;

    constructor(
        private studentService: StudentMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.studentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'studentListModification',
                content: 'Deleted an student'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-student-my-suffix-delete-popup',
    template: ''
})
export class StudentMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private studentPopupService: StudentMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.studentPopupService
                .open(StudentMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
