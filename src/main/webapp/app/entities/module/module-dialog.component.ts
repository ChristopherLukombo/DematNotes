import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Module } from './module.model';
import { ModulePopupService } from './module-popup.service';
import { ModuleService } from './module.service';

@Component({
    selector: 'jhi-module-dialog',
    templateUrl: './module-dialog.component.html'
})
export class ModuleDialogComponent implements OnInit {

    module: Module;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private moduleService: ModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.module.id !== undefined) {
            this.subscribeToSaveResponse(
                this.moduleService.update(this.module));
        } else {
            this.subscribeToSaveResponse(
                this.moduleService.create(this.module));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Module>>) {
        result.subscribe((res: HttpResponse<Module>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Module) {
        this.eventManager.broadcast({ name: 'moduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-module-popup',
    template: ''
})
export class ModulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modulePopupService: ModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modulePopupService
                    .open(ModuleDialogComponent as Component, params['id']);
            } else {
                this.modulePopupService
                    .open(ModuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
