/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { CourseMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/course-my-suffix/course-my-suffix-detail.component';
import { CourseMySuffixService } from '../../../../../../main/webapp/app/entities/course-my-suffix/course-my-suffix.service';
import { CourseMySuffix } from '../../../../../../main/webapp/app/entities/course-my-suffix/course-my-suffix.model';

describe('Component Tests', () => {

    describe('CourseMySuffix Management Detail Component', () => {
        let comp: CourseMySuffixDetailComponent;
        let fixture: ComponentFixture<CourseMySuffixDetailComponent>;
        let service: CourseMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [CourseMySuffixDetailComponent],
                providers: [
                    CourseMySuffixService
                ]
            })
            .overrideTemplate(CourseMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CourseMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.course).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
