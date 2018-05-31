/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { EvaluationMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix-delete-dialog.component';
import { EvaluationMySuffixService } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.service';

describe('Component Tests', () => {

    describe('EvaluationMySuffix Management Delete Component', () => {
        let comp: EvaluationMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EvaluationMySuffixDeleteDialogComponent>;
        let service: EvaluationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [EvaluationMySuffixDeleteDialogComponent],
                providers: [
                    EvaluationMySuffixService
                ]
            })
            .overrideTemplate(EvaluationMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationMySuffixService);
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
