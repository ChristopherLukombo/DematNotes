/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { DelayStudentDialogComponent } from '../../../../../../main/webapp/app/entities/delay-student/delay-student-dialog.component';
import { DelayStudentService } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.service';
import { DelayStudent } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.model';
import { ModuleService } from '../../../../../../main/webapp/app/entities/module';
import { StudentService } from '../../../../../../main/webapp/app/entities/student';

describe('Component Tests', () => {

    describe('DelayStudent Management Dialog Component', () => {
        let comp: DelayStudentDialogComponent;
        let fixture: ComponentFixture<DelayStudentDialogComponent>;
        let service: DelayStudentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DelayStudentDialogComponent],
                providers: [
                    ModuleService,
                    StudentService,
                    DelayStudentService
                ]
            })
            .overrideTemplate(DelayStudentDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayStudentDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayStudentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DelayStudent(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.delayStudent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'delayStudentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DelayStudent();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.delayStudent = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'delayStudentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
