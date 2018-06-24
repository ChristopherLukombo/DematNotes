import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssignmentYearPeriod } from './assignment-year-period.model';
import { AssignmentYearPeriodPopupService } from './assignment-year-period-popup.service';
import { AssignmentYearPeriodService } from './assignment-year-period.service';
import { School, SchoolService } from '../school';
import { YearPeriod, YearPeriodService } from '../year-period';
import { Classroom, ClassroomService } from '../classroom';

@Component({
    selector: 'jhi-assignment-year-period-dialog',
    templateUrl: './assignment-year-period-dialog.component.html'
})
export class AssignmentYearPeriodDialogComponent implements OnInit {

    assignmentYearPeriod: AssignmentYearPeriod;
    isSaving: boolean;

    schools: School[];

    yearperiods: YearPeriod[];

    classrooms: Classroom[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assignmentYearPeriodService: AssignmentYearPeriodService,
        private schoolService: SchoolService,
        private yearPeriodService: YearPeriodService,
        private classroomService: ClassroomService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.schoolService.query()
            .subscribe((res: HttpResponse<School[]>) => { this.schools = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.yearPeriodService.query()
            .subscribe((res: HttpResponse<YearPeriod[]>) => { this.yearperiods = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.classroomService.query()
            .subscribe((res: HttpResponse<Classroom[]>) => { this.classrooms = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assignmentYearPeriod.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assignmentYearPeriodService.update(this.assignmentYearPeriod));
        } else {
            this.subscribeToSaveResponse(
                this.assignmentYearPeriodService.create(this.assignmentYearPeriod));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AssignmentYearPeriod>>) {
        result.subscribe((res: HttpResponse<AssignmentYearPeriod>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AssignmentYearPeriod) {
        this.eventManager.broadcast({ name: 'assignmentYearPeriodListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSchoolById(index: number, item: School) {
        return item.id;
    }

    trackYearPeriodById(index: number, item: YearPeriod) {
        return item.id;
    }

    trackClassroomById(index: number, item: Classroom) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-assignment-year-period-popup',
    template: ''
})
export class AssignmentYearPeriodPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assignmentYearPeriodPopupService: AssignmentYearPeriodPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assignmentYearPeriodPopupService
                    .open(AssignmentYearPeriodDialogComponent as Component, params['id']);
            } else {
                this.assignmentYearPeriodPopupService
                    .open(AssignmentYearPeriodDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
