import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { YearPeriod } from './year-period.model';
import { YearPeriodService } from './year-period.service';

@Injectable()
export class YearPeriodPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private yearPeriodService: YearPeriodService

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
                this.yearPeriodService.find(id)
                    .subscribe((yearPeriodResponse: HttpResponse<YearPeriod>) => {
                        const yearPeriod: YearPeriod = yearPeriodResponse.body;
                        if (yearPeriod.startDate) {
                            yearPeriod.startDate = {
                                year: yearPeriod.startDate.getFullYear(),
                                month: yearPeriod.startDate.getMonth() + 1,
                                day: yearPeriod.startDate.getDate()
                            };
                        }
                        if (yearPeriod.endDate) {
                            yearPeriod.endDate = {
                                year: yearPeriod.endDate.getFullYear(),
                                month: yearPeriod.endDate.getMonth() + 1,
                                day: yearPeriod.endDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.yearPeriodModalRef(component, yearPeriod);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.yearPeriodModalRef(component, new YearPeriod());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    yearPeriodModalRef(component: Component, yearPeriod: YearPeriod): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.yearPeriod = yearPeriod;
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
