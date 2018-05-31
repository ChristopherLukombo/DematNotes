/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { DelayStudentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix-detail.component';
import { DelayStudentMySuffixService } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix.service';
import { DelayStudentMySuffix } from '../../../../../../main/webapp/app/entities/delay-student-my-suffix/delay-student-my-suffix.model';

describe('Component Tests', () => {

    describe('DelayStudentMySuffix Management Detail Component', () => {
        let comp: DelayStudentMySuffixDetailComponent;
        let fixture: ComponentFixture<DelayStudentMySuffixDetailComponent>;
        let service: DelayStudentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DelayStudentMySuffixDetailComponent],
                providers: [
                    DelayStudentMySuffixService
                ]
            })
            .overrideTemplate(DelayStudentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DelayStudentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DelayStudentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DelayStudentMySuffix(123)
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
