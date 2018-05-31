import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StudentMySuffix } from './student-my-suffix.model';
import { StudentMySuffixService } from './student-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-student-my-suffix',
    templateUrl: './student-my-suffix.component.html'
})
export class StudentMySuffixComponent implements OnInit, OnDestroy {
students: StudentMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private studentService: StudentMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.studentService.query().subscribe(
            (res: HttpResponse<StudentMySuffix[]>) => {
                this.students = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStudents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: StudentMySuffix) {
        return item.id;
    }
    registerChangeInStudents() {
        this.eventSubscriber = this.eventManager.subscribe('studentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
