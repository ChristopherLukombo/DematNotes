/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionDialogComponent } from '../../../../../../main/webapp/app/entities/inscription/inscription-dialog.component';
import { InscriptionService } from '../../../../../../main/webapp/app/entities/inscription/inscription.service';
import { Inscription } from '../../../../../../main/webapp/app/entities/inscription/inscription.model';
import { SchoolService } from '../../../../../../main/webapp/app/entities/school';
import { ClassroomService } from '../../../../../../main/webapp/app/entities/classroom';
import { SchoolYearService } from '../../../../../../main/webapp/app/entities/school-year';
import { StudentService } from '../../../../../../main/webapp/app/entities/student';

describe('Component Tests', () => {

    describe('Inscription Management Dialog Component', () => {
        let comp: InscriptionDialogComponent;
        let fixture: ComponentFixture<InscriptionDialogComponent>;
        let service: InscriptionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionDialogComponent],
                providers: [
                    SchoolService,
                    ClassroomService,
                    SchoolYearService,
                    StudentService,
                    InscriptionService
                ]
            })
            .overrideTemplate(InscriptionDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inscription(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscription = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscriptionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Inscription();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.inscription = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'inscriptionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
