/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { DelayStudentComponent } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.component';
import { DelayStudentService } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.service';
import { DelayStudent } from '../../../../../../main/webapp/app/entities/delay-student/delay-student.model';

describe('Component Tests', () => {

    describe('DelayStudent Management Component', () => {
        let comp: DelayStudentComponent;
        let fixture: ComponentFixture<DelayStudentComponent>;
        let service: DelayStudentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DelayStudentComponent],
                providers: [
                    DelayStudentService
                ]
            })
            .overrideTemplate(DelayStudentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayStudentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayStudentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DelayStudent(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.delayStudents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
