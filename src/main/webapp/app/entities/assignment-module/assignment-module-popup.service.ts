import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AssignmentModule } from './assignment-module.model';
import { AssignmentModuleService } from './assignment-module.service';

@Injectable()
export class AssignmentModulePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private assignmentModuleService: AssignmentModuleService

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
                this.assignmentModuleService.find(id)
                    .subscribe((assignmentModuleResponse: HttpResponse<AssignmentModule>) => {
                        const assignmentModule: AssignmentModule = assignmentModuleResponse.body;
                        this.ngbModalRef = this.assignmentModuleModalRef(component, assignmentModule);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.assignmentModuleModalRef(component, new AssignmentModule());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    assignmentModuleModalRef(component: Component, assignmentModule: AssignmentModule): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assignmentModule = assignmentModule;
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
