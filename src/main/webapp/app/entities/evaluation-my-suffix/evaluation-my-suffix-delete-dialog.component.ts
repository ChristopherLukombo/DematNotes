import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EvaluationMySuffix } from './evaluation-my-suffix.model';
import { EvaluationMySuffixPopupService } from './evaluation-my-suffix-popup.service';
import { EvaluationMySuffixService } from './evaluation-my-suffix.service';

@Component({
    selector: 'jhi-evaluation-my-suffix-delete-dialog',
    templateUrl: './evaluation-my-suffix-delete-dialog.component.html'
})
export class EvaluationMySuffixDeleteDialogComponent {

    evaluation: EvaluationMySuffix;

    constructor(
        private evaluationService: EvaluationMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.evaluationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'evaluationListModification',
                content: 'Deleted an evaluation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evaluation-my-suffix-delete-popup',
    template: ''
})
export class EvaluationMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private evaluationPopupService: EvaluationMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.evaluationPopupService
                .open(EvaluationMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
