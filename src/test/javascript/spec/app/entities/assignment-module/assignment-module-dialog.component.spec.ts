/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentModuleDialogComponent } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module-dialog.component';
import { AssignmentModuleService } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.service';
import { AssignmentModule } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.model';
import { ClassroomService } from '../../../../../../main/webapp/app/entities/classroom';
import { SchoolService } from '../../../../../../main/webapp/app/entities/school';
import { SchoolYearService } from '../../../../../../main/webapp/app/entities/school-year';
import { TeacherService } from '../../../../../../main/webapp/app/entities/teacher';
import { ModuleService } from '../../../../../../main/webapp/app/entities/module';

describe('Component Tests', () => {

    describe('AssignmentModule Management Dialog Component', () => {
        let comp: AssignmentModuleDialogComponent;
        let fixture: ComponentFixture<AssignmentModuleDialogComponent>;
        let service: AssignmentModuleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentModuleDialogComponent],
                providers: [
                    ClassroomService,
                    SchoolService,
                    SchoolYearService,
                    TeacherService,
                    ModuleService,
                    AssignmentModuleService
                ]
            })
            .overrideTemplate(AssignmentModuleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentModuleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentModuleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssignmentModule(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assignmentModule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assignmentModuleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssignmentModule();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assignmentModule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assignmentModuleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
