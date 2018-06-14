import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Evaluation } from './evaluation.model';
import { EvaluationService } from './evaluation.service';

@Injectable()
export class EvaluationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private evaluationService: EvaluationService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.evaluationService.find(id)
                    .subscribe((evaluationResponse: HttpResponse<Evaluation>) => {
                        const evaluation: Evaluation = evaluationResponse.body;
                        evaluation.evaluationDate = this.datePipe
                            .transform(evaluation.evaluationDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.evaluationModalRef(component, evaluation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.evaluationModalRef(component, new Evaluation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    evaluationModalRef(component: Component, evaluation: Evaluation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.evaluation = evaluation;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
