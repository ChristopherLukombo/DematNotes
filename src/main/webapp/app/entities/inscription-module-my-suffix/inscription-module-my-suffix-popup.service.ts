import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InscriptionModuleMySuffix } from './inscription-module-my-suffix.model';
import { InscriptionModuleMySuffixService } from './inscription-module-my-suffix.service';

@Injectable()
export class InscriptionModuleMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private inscriptionModuleService: InscriptionModuleMySuffixService

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
                this.inscriptionModuleService.find(id)
                    .subscribe((inscriptionModuleResponse: HttpResponse<InscriptionModuleMySuffix>) => {
                        const inscriptionModule: InscriptionModuleMySuffix = inscriptionModuleResponse.body;
                        if (inscriptionModule.inscriptionDate) {
                            inscriptionModule.inscriptionDate = {
                                year: inscriptionModule.inscriptionDate.getFullYear(),
                                month: inscriptionModule.inscriptionDate.getMonth() + 1,
                                day: inscriptionModule.inscriptionDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.inscriptionModuleModalRef(component, inscriptionModule);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.inscriptionModuleModalRef(component, new InscriptionModuleMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    inscriptionModuleModalRef(component: Component, inscriptionModule: InscriptionModuleMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.inscriptionModule = inscriptionModule;
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
