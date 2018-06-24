/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentManagerDialogComponent } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager-dialog.component';
import { AssignmentManagerService } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager.service';
import { AssignmentManager } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager.model';
import { SchoolYearService } from '../../../../../../main/webapp/app/entities/school-year';
import { SchoolService } from '../../../../../../main/webapp/app/entities/school';
import { ManagerService } from '../../../../../../main/webapp/app/entities/manager';

describe('Component Tests', () => {

    describe('AssignmentManager Management Dialog Component', () => {
        let comp: AssignmentManagerDialogComponent;
        let fixture: ComponentFixture<AssignmentManagerDialogComponent>;
        let service: AssignmentManagerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentManagerDialogComponent],
                providers: [
                    SchoolYearService,
                    SchoolService,
                    ManagerService,
                    AssignmentManagerService
                ]
            })
            .overrideTemplate(AssignmentManagerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentManagerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentManagerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssignmentManager(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assignmentManager = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assignmentManagerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssignmentManager();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assignmentManager = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assignmentManagerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
