import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AbsenceMySuffix } from './absence-my-suffix.model';
import { AbsenceMySuffixService } from './absence-my-suffix.service';

@Component({
    selector: 'jhi-absence-my-suffix-detail',
    templateUrl: './absence-my-suffix-detail.component.html'
})
export class AbsenceMySuffixDetailComponent implements OnInit, OnDestroy {

    absence: AbsenceMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private absenceService: AbsenceMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAbsences();
    }

    load(id) {
        this.absenceService.find(id)
            .subscribe((absenceResponse: HttpResponse<AbsenceMySuffix>) => {
                this.absence = absenceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAbsences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'absenceListModification',
            (response) => this.load(this.absence.id)
        );
    }
}
