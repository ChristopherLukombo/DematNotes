/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolReportMySuffixComponent } from '../../../../../../main/webapp/app/entities/school-report-my-suffix/school-report-my-suffix.component';
import { SchoolReportMySuffixService } from '../../../../../../main/webapp/app/entities/school-report-my-suffix/school-report-my-suffix.service';
import { SchoolReportMySuffix } from '../../../../../../main/webapp/app/entities/school-report-my-suffix/school-report-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolReportMySuffix Management Component', () => {
        let comp: SchoolReportMySuffixComponent;
        let fixture: ComponentFixture<SchoolReportMySuffixComponent>;
        let service: SchoolReportMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolReportMySuffixComponent],
                providers: [
                    SchoolReportMySuffixService
                ]
            })
            .overrideTemplate(SchoolReportMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolReportMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolReportMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SchoolReportMySuffix(123)],
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
