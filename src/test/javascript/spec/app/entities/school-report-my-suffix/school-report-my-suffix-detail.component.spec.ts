/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolReportMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/school-report-my-suffix/school-report-my-suffix-detail.component';
import { SchoolReportMySuffixService } from '../../../../../../main/webapp/app/entities/school-report-my-suffix/school-report-my-suffix.service';
import { SchoolReportMySuffix } from '../../../../../../main/webapp/app/entities/school-report-my-suffix/school-report-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolReportMySuffix Management Detail Component', () => {
        let comp: SchoolReportMySuffixDetailComponent;
        let fixture: ComponentFixture<SchoolReportMySuffixDetailComponent>;
        let service: SchoolReportMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolReportMySuffixDetailComponent],
                providers: [
                    SchoolReportMySuffixService
                ]
            })
            .overrideTemplate(SchoolReportMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolReportMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolReportMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SchoolReportMySuffix(123)
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
