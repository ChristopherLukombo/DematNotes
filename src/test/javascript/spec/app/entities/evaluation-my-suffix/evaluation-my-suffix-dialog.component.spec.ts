/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { EvaluationMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix-dialog.component';
import { EvaluationMySuffixService } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.service';
import { EvaluationMySuffix } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.model';
import { ModuleMySuffixService } from '../../../../../../main/webapp/app/entities/module-my-suffix';
import { StudentMySuffixService } from '../../../../../../main/webapp/app/entities/student-my-suffix';
import { SchoolReportMySuffixService } from '../../../../../../main/webapp/app/entities/school-report-my-suffix';

describe('Component Tests', () => {

    describe('EvaluationMySuffix Management Dialog Component', () => {
        let comp: EvaluationMySuffixDialogComponent;
        let fixture: ComponentFixture<EvaluationMySuffixDialogComponent>;
        let service: EvaluationMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [EvaluationMySuffixDialogComponent],
                providers: [
                    ModuleMySuffixService,
                    StudentMySuffixService,
                    SchoolReportMySuffixService,
                    EvaluationMySuffixService
                ]
            })
            .overrideTemplate(EvaluationMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new EvaluationMySuffix(123);
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
                        const entity = new EvaluationMySuffix();
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
