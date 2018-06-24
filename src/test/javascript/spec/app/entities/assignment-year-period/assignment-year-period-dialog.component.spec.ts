/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentYearPeriodDialogComponent } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period-dialog.component';
import { AssignmentYearPeriodService } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.service';
import { AssignmentYearPeriod } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.model';
import { SchoolService } from '../../../../../../main/webapp/app/entities/school';
import { YearPeriodService } from '../../../../../../main/webapp/app/entities/year-period';
import { ClassroomService } from '../../../../../../main/webapp/app/entities/classroom';

describe('Component Tests', () => {

    describe('AssignmentYearPeriod Management Dialog Component', () => {
        let comp: AssignmentYearPeriodDialogComponent;
        let fixture: ComponentFixture<AssignmentYearPeriodDialogComponent>;
        let service: AssignmentYearPeriodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentYearPeriodDialogComponent],
                providers: [
                    SchoolService,
                    YearPeriodService,
                    ClassroomService,
                    AssignmentYearPeriodService
                ]
            })
            .overrideTemplate(AssignmentYearPeriodDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentYearPeriodDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentYearPeriodService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssignmentYearPeriod(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assignmentYearPeriod = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assignmentYearPeriodListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssignmentYearPeriod();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assignmentYearPeriod = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assignmentYearPeriodListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
