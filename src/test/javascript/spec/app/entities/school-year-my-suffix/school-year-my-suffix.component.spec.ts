/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolYearMySuffixComponent } from '../../../../../../main/webapp/app/entities/school-year-my-suffix/school-year-my-suffix.component';
import { SchoolYearMySuffixService } from '../../../../../../main/webapp/app/entities/school-year-my-suffix/school-year-my-suffix.service';
import { SchoolYearMySuffix } from '../../../../../../main/webapp/app/entities/school-year-my-suffix/school-year-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolYearMySuffix Management Component', () => {
        let comp: SchoolYearMySuffixComponent;
        let fixture: ComponentFixture<SchoolYearMySuffixComponent>;
        let service: SchoolYearMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolYearMySuffixComponent],
                providers: [
                    SchoolYearMySuffixService
                ]
            })
            .overrideTemplate(SchoolYearMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolYearMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolYearMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SchoolYearMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.schoolYears[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
