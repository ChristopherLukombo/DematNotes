/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { StudentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix-detail.component';
import { StudentMySuffixService } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.service';
import { StudentMySuffix } from '../../../../../../main/webapp/app/entities/student-my-suffix/student-my-suffix.model';

describe('Component Tests', () => {

    describe('StudentMySuffix Management Detail Component', () => {
        let comp: StudentMySuffixDetailComponent;
        let fixture: ComponentFixture<StudentMySuffixDetailComponent>;
        let service: StudentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [StudentMySuffixDetailComponent],
                providers: [
                    StudentMySuffixService
                ]
            })
            .overrideTemplate(StudentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StudentMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.student).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
