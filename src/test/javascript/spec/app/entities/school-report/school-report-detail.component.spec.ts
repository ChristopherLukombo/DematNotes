/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolReportDetailComponent } from '../../../../../../main/webapp/app/entities/school-report/school-report-detail.component';
import { SchoolReportService } from '../../../../../../main/webapp/app/entities/school-report/school-report.service';
import { SchoolReport } from '../../../../../../main/webapp/app/entities/school-report/school-report.model';

describe('Component Tests', () => {

    describe('SchoolReport Management Detail Component', () => {
        let comp: SchoolReportDetailComponent;
        let fixture: ComponentFixture<SchoolReportDetailComponent>;
        let service: SchoolReportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolReportDetailComponent],
                providers: [
                    SchoolReportService
                ]
            })
            .overrideTemplate(SchoolReportDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolReportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolReportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SchoolReport(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.schoolReport).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
