import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Teacher } from './teacher.model';
import { TeacherService } from './teacher.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-teacher',
    templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit, OnDestroy {
teachers: Teacher[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private teacherService: TeacherService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.teacherService.query().subscribe(
            (res: HttpResponse<Teacher[]>) => {
                this.teachers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTeachers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Teacher) {
        return item.id;
    }
    registerChangeInTeachers() {
        this.eventSubscriber = this.eventManager.subscribe('teacherListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
