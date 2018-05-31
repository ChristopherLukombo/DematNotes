/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { InterventionMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix-delete-dialog.component';
import { InterventionMySuffixService } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.service';

describe('Component Tests', () => {

    describe('InterventionMySuffix Management Delete Component', () => {
        let comp: InterventionMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<InterventionMySuffixDeleteDialogComponent>;
        let service: InterventionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InterventionMySuffixDeleteDialogComponent],
                providers: [
                    InterventionMySuffixService
                ]
            })
            .overrideTemplate(InterventionMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterventionMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterventionMySuffixService);
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
