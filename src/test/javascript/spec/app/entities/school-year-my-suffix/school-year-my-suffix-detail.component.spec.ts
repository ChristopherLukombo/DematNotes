/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolYearMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/school-year-my-suffix/school-year-my-suffix-detail.component';
import { SchoolYearMySuffixService } from '../../../../../../main/webapp/app/entities/school-year-my-suffix/school-year-my-suffix.service';
import { SchoolYearMySuffix } from '../../../../../../main/webapp/app/entities/school-year-my-suffix/school-year-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolYearMySuffix Management Detail Component', () => {
        let comp: SchoolYearMySuffixDetailComponent;
        let fixture: ComponentFixture<SchoolYearMySuffixDetailComponent>;
        let service: SchoolYearMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolYearMySuffixDetailComponent],
                providers: [
                    SchoolYearMySuffixService
                ]
            })
            .overrideTemplate(SchoolYearMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolYearMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolYearMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SchoolYearMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.schoolYear).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
