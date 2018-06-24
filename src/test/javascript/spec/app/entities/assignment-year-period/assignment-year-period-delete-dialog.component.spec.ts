/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentYearPeriodDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period-delete-dialog.component';
import { AssignmentYearPeriodService } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.service';

describe('Component Tests', () => {

    describe('AssignmentYearPeriod Management Delete Component', () => {
        let comp: AssignmentYearPeriodDeleteDialogComponent;
        let fixture: ComponentFixture<AssignmentYearPeriodDeleteDialogComponent>;
        let service: AssignmentYearPeriodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentYearPeriodDeleteDialogComponent],
                providers: [
                    AssignmentYearPeriodService
                ]
            })
            .overrideTemplate(AssignmentYearPeriodDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentYearPeriodDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentYearPeriodService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
