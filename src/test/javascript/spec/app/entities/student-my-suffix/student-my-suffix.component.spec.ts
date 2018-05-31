/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { StudentMySuffixComponent } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.component';
import { StudentMySuffixService } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.service';
import { StudentMySuffix } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.model';

describe('Component Tests', () => {

    describe('StudentMySuffix Management Component', () => {
        let comp: StudentMySuffixComponent;
        let fixture: ComponentFixture<StudentMySuffixComponent>;
        let service: StudentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [StudentMySuffixComponent],
                providers: [
                    StudentMySuffixService
                ]
            })
            .overrideTemplate(StudentMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StudentMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.students[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
