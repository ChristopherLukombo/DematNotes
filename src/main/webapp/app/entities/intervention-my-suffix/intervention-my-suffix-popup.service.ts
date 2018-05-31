import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { InterventionMySuffix } from './intervention-my-suffix.model';
import { InterventionMySuffixService } from './intervention-my-suffix.service';

@Injectable()
export class InterventionMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private interventionService: InterventionMySuffixService

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
                this.interventionService.find(id)
                    .subscribe((interventionResponse: HttpResponse<InterventionMySuffix>) => {
                        const intervention: InterventionMySuffix = interventionResponse.body;
                        intervention.startDate = this.datePipe
                            .transform(intervention.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        intervention.endDate = this.datePipe
                            .transform(intervention.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.interventionModalRef(component, intervention);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.interventionModalRef(component, new InterventionMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    interventionModalRef(component: Component, intervention: InterventionMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.intervention = intervention;
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
