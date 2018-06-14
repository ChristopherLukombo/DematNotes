/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { DelayStudentDetailComponent } from '../../../../../../main/webapp/app/entities/delay-student/delay-student-detail.component';
import { DelayStudentService } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.service';
import { DelayStudent } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.model';

describe('Component Tests', () => {

    describe('DelayStudent Management Detail Component', () => {
        let comp: DelayStudentDetailComponent;
        let fixture: ComponentFixture<DelayStudentDetailComponent>;
        let service: DelayStudentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DelayStudentDetailComponent],
                providers: [
                    DelayStudentService
                ]
            })
            .overrideTemplate(DelayStudentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayStudentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayStudentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DelayStudent(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.delayStudent).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
