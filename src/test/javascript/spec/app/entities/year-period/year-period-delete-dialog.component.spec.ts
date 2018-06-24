/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { YearPeriodDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/year-period/year-period-delete-dialog.component';
import { YearPeriodService } from '../../../../../../main/webapp/app/entities/year-period/year-period.service';

describe('Component Tests', () => {

    describe('YearPeriod Management Delete Component', () => {
        let comp: YearPeriodDeleteDialogComponent;
        let fixture: ComponentFixture<YearPeriodDeleteDialogComponent>;
        let service: YearPeriodService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [YearPeriodDeleteDialogComponent],
                providers: [
                    YearPeriodService
                ]
            })
            .overrideTemplate(YearPeriodDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearPeriodDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearPeriodService);
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
