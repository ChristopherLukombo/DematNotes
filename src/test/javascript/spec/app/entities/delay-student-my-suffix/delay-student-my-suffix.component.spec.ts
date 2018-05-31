/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { DelayStudentMySuffixComponent } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix.component';
import { DelayStudentMySuffixService } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix.service';
import { DelayStudentMySuffix } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix.model';

describe('Component Tests', () => {

    describe('DelayStudentMySuffix Management Component', () => {
        let comp: DelayStudentMySuffixComponent;
        let fixture: ComponentFixture<DelayStudentMySuffixComponent>;
        let service: DelayStudentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DelayStudentMySuffixComponent],
                providers: [
                    DelayStudentMySuffixService
                ]
            })
            .overrideTemplate(DelayStudentMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayStudentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayStudentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DelayStudentMySuffix(123)],
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
