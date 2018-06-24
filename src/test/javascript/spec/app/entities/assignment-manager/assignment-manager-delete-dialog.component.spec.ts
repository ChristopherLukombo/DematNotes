/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentManagerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager-delete-dialog.component';
import { AssignmentManagerService } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager.service';

describe('Component Tests', () => {

    describe('AssignmentManager Management Delete Component', () => {
        let comp: AssignmentManagerDeleteDialogComponent;
        let fixture: ComponentFixture<AssignmentManagerDeleteDialogComponent>;
        let service: AssignmentManagerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentManagerDeleteDialogComponent],
                providers: [
                    AssignmentManagerService
                ]
            })
            .overrideTemplate(AssignmentManagerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentManagerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentManagerService);
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
