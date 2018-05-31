/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { DelayStudentMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix-delete-dialog.component';
import { DelayStudentMySuffixService } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix.service';

describe('Component Tests', () => {

    describe('DelayStudentMySuffix Management Delete Component', () => {
        let comp: DelayStudentMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DelayStudentMySuffixDeleteDialogComponent>;
        let service: DelayStudentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DelayStudentMySuffixDeleteDialogComponent],
                providers: [
                    DelayStudentMySuffixService
                ]
            })
            .overrideTemplate(DelayStudentMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayStudentMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayStudentMySuffixService);
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
