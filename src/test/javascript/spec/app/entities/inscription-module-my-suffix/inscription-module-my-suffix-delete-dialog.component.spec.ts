/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionModuleMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix-delete-dialog.component';
import { InscriptionModuleMySuffixService } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.service';

describe('Component Tests', () => {

    describe('InscriptionModuleMySuffix Management Delete Component', () => {
        let comp: InscriptionModuleMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<InscriptionModuleMySuffixDeleteDialogComponent>;
        let service: InscriptionModuleMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionModuleMySuffixDeleteDialogComponent],
                providers: [
                    InscriptionModuleMySuffixService
                ]
            })
            .overrideTemplate(InscriptionModuleMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionModuleMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionModuleMySuffixService);
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
