import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ManagerMySuffix } from './manager-my-suffix.model';
import { ManagerMySuffixPopupService } from './manager-my-suffix-popup.service';
import { ManagerMySuffixService } from './manager-my-suffix.service';
import { User, UserService } from '../../shared';

@Component({
    selector: 'jhi-manager-my-suffix-dialog',
    templateUrl: './manager-my-suffix-dialog.component.html'
})
export class ManagerMySuffixDialogComponent implements OnInit {

    manager: ManagerMySuffix;
    isSaving: boolean;

    users: User[];
    dateOfBirthDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private managerService: ManagerMySuffixService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.manager.id !== undefined) {
            this.subscribeToSaveResponse(
                this.managerService.update(this.manager));
        } else {
            this.subscribeToSaveResponse(
                this.managerService.create(this.manager));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ManagerMySuffix>>) {
        result.subscribe((res: HttpResponse<ManagerMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ManagerMySuffix) {
        this.eventManager.broadcast({ name: 'managerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-manager-my-suffix-popup',
    template: ''
})
export class ManagerMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private managerPopupService: ManagerMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.managerPopupService
                    .open(ManagerMySuffixDialogComponent as Component, params['id']);
            } else {
                this.managerPopupService
                    .open(ManagerMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
