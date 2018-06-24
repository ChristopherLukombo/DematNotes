import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AssignmentManager } from './assignment-manager.model';
import { AssignmentManagerService } from './assignment-manager.service';

@Injectable()
export class AssignmentManagerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private assignmentManagerService: AssignmentManagerService

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
                this.assignmentManagerService.find(id)
                    .subscribe((assignmentManagerResponse: HttpResponse<AssignmentManager>) => {
                        const assignmentManager: AssignmentManager = assignmentManagerResponse.body;
                        this.ngbModalRef = this.assignmentManagerModalRef(component, assignmentManager);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.assignmentManagerModalRef(component, new AssignmentManager());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    assignmentManagerModalRef(component: Component, assignmentManager: AssignmentManager): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assignmentManager = assignmentManager;
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
