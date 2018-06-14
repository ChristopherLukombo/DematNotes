import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DelayStudent } from './delay-student.model';
import { DelayStudentService } from './delay-student.service';

@Injectable()
export class DelayStudentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private delayStudentService: DelayStudentService

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
                    .subscribe((delayStudentResponse: HttpResponse<DelayStudent>) => {
                        const delayStudent: DelayStudent = delayStudentResponse.body;
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
                    this.ngbModalRef = this.delayStudentModalRef(component, new DelayStudent());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    delayStudentModalRef(component: Component, delayStudent: DelayStudent): NgbModalRef {
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
