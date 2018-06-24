import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AssignmentYearPeriod } from './assignment-year-period.model';
import { AssignmentYearPeriodService } from './assignment-year-period.service';

@Injectable()
export class AssignmentYearPeriodPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private assignmentYearPeriodService: AssignmentYearPeriodService

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
                this.assignmentYearPeriodService.find(id)
                    .subscribe((assignmentYearPeriodResponse: HttpResponse<AssignmentYearPeriod>) => {
                        const assignmentYearPeriod: AssignmentYearPeriod = assignmentYearPeriodResponse.body;
                        this.ngbModalRef = this.assignmentYearPeriodModalRef(component, assignmentYearPeriod);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.assignmentYearPeriodModalRef(component, new AssignmentYearPeriod());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    assignmentYearPeriodModalRef(component: Component, assignmentYearPeriod: AssignmentYearPeriod): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assignmentYearPeriod = assignmentYearPeriod;
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
