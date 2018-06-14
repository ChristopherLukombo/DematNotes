/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { EvaluationDialogComponent } from '../../../../../../main/webapp/app/entities/evaluation/evaluation-dialog.component';
import { EvaluationService } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.service';
import { Evaluation } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.model';
import { StudentService } from '../../../../../../main/webapp/app/entities/student';
import { ModuleService } from '../../../../../../main/webapp/app/entities/module';
import { SchoolReportService } from '../../../../../../main/webapp/app/entities/school-report';

describe('Component Tests', () => {

    describe('Evaluation Management Dialog Component', () => {
        let comp: EvaluationDialogComponent;
        let fixture: ComponentFixture<EvaluationDialogComponent>;
        let service: EvaluationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [EvaluationDialogComponent],
                providers: [
                    StudentService,
                    ModuleService,
                    SchoolReportService,
                    EvaluationService
                ]
            })
            .overrideTemplate(EvaluationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Evaluation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.evaluation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'evaluationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Evaluation();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.evaluation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'evaluationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
