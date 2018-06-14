import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AssignmentModule } from './assignment-module.model';
import { AssignmentModuleService } from './assignment-module.service';

@Component({
    selector: 'jhi-assignment-module-detail',
    templateUrl: './assignment-module-detail.component.html'
})
export class AssignmentModuleDetailComponent implements OnInit, OnDestroy {

    assignmentModule: AssignmentModule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assignmentModuleService: AssignmentModuleService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssignmentModules();
    }

    load(id) {
        this.assignmentModuleService.find(id)
            .subscribe((assignmentModuleResponse: HttpResponse<AssignmentModule>) => {
                this.assignmentModule = assignmentModuleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssignmentModules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assignmentModuleListModification',
            (response) => this.load(this.assignmentModule.id)
        );
    }
}
