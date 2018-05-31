/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DematNotesTestModule } from '../../../test.module';
import { StudentMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix-dialog.component';
import { StudentMySuffixService } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.service';
import { StudentMySuffix } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { SchoolYearMySuffixService } from '../../../../../../main/webapp/app/entities/school-year-my-suffix';
import { ClassroomMySuffixService } from '../../../../../../main/webapp/app/entities/classroom-my-suffix';
import { SchoolMySuffixService } from '../../../../../../main/webapp/app/entities/school-my-suffix';

describe('Component Tests', () => {

    describe('StudentMySuffix Management Dialog Component', () => {
        let comp: StudentMySuffixDialogComponent;
        let fixture: ComponentFixture<StudentMySuffixDialogComponent>;
        let service: StudentMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [StudentMySuffixDialogComponent],
                providers: [
                    UserService,
                    SchoolYearMySuffixService,
                    ClassroomMySuffixService,
                    SchoolMySuffixService,
                    StudentMySuffixService
                ]
            })
            .overrideTemplate(StudentMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudentMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.student = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudentMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.student = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
