import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DelayStudentMySuffix } from './delay-student-my-suffix.model';
import { DelayStudentMySuffixService } from './delay-student-my-suffix.service';

@Injectable()
export class DelayStudentMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private delayStudentService: DelayStudentMySuffixService

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
                this.delayStudentService.find(id)
                    .subscribe((delayStudentResponse: HttpResponse<DelayStudentMySuffix>) => {
                        const delayStudent: DelayStudentMySuffix = delayStudentResponse.body;
                        delayStudent.startDate = this.datePipe
                            .transform(delayStudent.startDate, 'yyyy-MM-ddTHH:mm:ss');
                        delayStudent.endDate = this.datePipe
                            .transform(delayStudent.endDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.delayStudentModalRef(component, delayStudent);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.delayStudentModalRef(component, new DelayStudentMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    delayStudentModalRef(component: Component, delayStudent: DelayStudentMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.delayStudent = delayStudent;
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
