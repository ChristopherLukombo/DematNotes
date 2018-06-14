/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolReportComponent } from '../../../../../../main/webapp/app/entities/school-report/school-report.component';
import { SchoolReportService } from '../../../../../../main/webapp/app/entities/school-report/school-report.service';
import { SchoolReport } from '../../../../../../main/webapp/app/entities/school-report/school-report.model';

describe('Component Tests', () => {

    describe('SchoolReport Management Component', () => {
        let comp: SchoolReportComponent;
        let fixture: ComponentFixture<SchoolReportComponent>;
        let service: SchoolReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolReportComponent],
                providers: [
                    SchoolReportService
                ]
            })
            .overrideTemplate(SchoolReportComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolReportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SchoolReport(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.schoolReports[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
