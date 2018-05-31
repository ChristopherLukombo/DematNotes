import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AbsenceMySuffix } from './absence-my-suffix.model';
import { AbsenceMySuffixService } from './absence-my-suffix.service';

@Injectable()
export class AbsenceMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private absenceService: AbsenceMySuffixService

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
                this.absenceService.find(id)
                    .subscribe((absenceResponse: HttpResponse<AbsenceMySuffix>) => {
                        const absence: AbsenceMySuffix = absenceResponse.body;
                        absence.startDate = this.datePipe
                            .transform(absence.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        absence.endDate = this.datePipe
                            .transform(absence.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.absenceModalRef(component, absence);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.absenceModalRef(component, new AbsenceMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    absenceModalRef(component: Component, absence: AbsenceMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.absence = absence;
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
