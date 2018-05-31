/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionModuleMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix-dialog.component';
import { InscriptionModuleMySuffixService } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.service';
import { InscriptionModuleMySuffix } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.model';
import { ModuleMySuffixService } from '../../../../../../main/webapp/app/entities/module-my-suffix';
import { StudentMySuffixService } from '../../../../../../main/webapp/app/entities/student-my-suffix';

describe('Component Tests', () => {

    describe('InscriptionModuleMySuffix Management Dialog Component', () => {
        let comp: InscriptionModuleMySuffixDialogComponent;
        let fixture: ComponentFixture<InscriptionModuleMySuffixDialogComponent>;
        let service: InscriptionModuleMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionModuleMySuffixDialogComponent],
                providers: [
                    ModuleMySuffixService,
                    StudentMySuffixService,
                    InscriptionModuleMySuffixService
                ]
            })
            .overrideTemplate(InscriptionModuleMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionModuleMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionModuleMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InscriptionModuleMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscriptionModule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscriptionModuleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InscriptionModuleMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscriptionModule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscriptionModuleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
