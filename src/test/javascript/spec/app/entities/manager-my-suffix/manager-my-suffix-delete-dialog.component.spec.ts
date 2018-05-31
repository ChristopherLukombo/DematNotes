/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { ManagerMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix-delete-dialog.component';
import { ManagerMySuffixService } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix.service';

describe('Component Tests', () => {

    describe('ManagerMySuffix Management Delete Component', () => {
        let comp: ManagerMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ManagerMySuffixDeleteDialogComponent>;
        let service: ManagerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ManagerMySuffixDeleteDialogComponent],
                providers: [
                    ManagerMySuffixService
                ]
            })
            .overrideTemplate(ManagerMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ManagerMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ManagerMySuffixService);
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
