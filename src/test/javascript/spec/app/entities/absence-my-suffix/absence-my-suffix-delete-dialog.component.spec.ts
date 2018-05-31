/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { AbsenceMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix-delete-dialog.component';
import { AbsenceMySuffixService } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix.service';

describe('Component Tests', () => {

    describe('AbsenceMySuffix Management Delete Component', () => {
        let comp: AbsenceMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<AbsenceMySuffixDeleteDialogComponent>;
        let service: AbsenceMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AbsenceMySuffixDeleteDialogComponent],
                providers: [
                    AbsenceMySuffixService
                ]
            })
            .overrideTemplate(AbsenceMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbsenceMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbsenceMySuffixService);
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
