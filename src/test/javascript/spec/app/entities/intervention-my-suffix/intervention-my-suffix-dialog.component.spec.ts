/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { InterventionMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix-dialog.component';
import { InterventionMySuffixService } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.service';
import { InterventionMySuffix } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.model';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix';
import { ModuleMySuffixService } from '../../../../../../main/webapp/app/entities/module-my-suffix';

describe('Component Tests', () => {

    describe('InterventionMySuffix Management Dialog Component', () => {
        let comp: InterventionMySuffixDialogComponent;
        let fixture: ComponentFixture<InterventionMySuffixDialogComponent>;
        let service: InterventionMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InterventionMySuffixDialogComponent],
                providers: [
                    TeacherMySuffixService,
                    ModuleMySuffixService,
                    InterventionMySuffixService
                ]
            })
            .overrideTemplate(InterventionMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterventionMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterventionMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InterventionMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervention = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'interventionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new InterventionMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.intervention = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'interventionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
