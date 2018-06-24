/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { YearPeriodComponent } from '../../../../../../main/webapp/app/entities/year-period/year-period.component';
import { YearPeriodService } from '../../../../../../main/webapp/app/entities/year-period/year-period.service';
import { YearPeriod } from '../../../../../../main/webapp/app/entities/year-period/year-period.model';

describe('Component Tests', () => {

    describe('YearPeriod Management Component', () => {
        let comp: YearPeriodComponent;
        let fixture: ComponentFixture<YearPeriodComponent>;
        let service: YearPeriodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [YearPeriodComponent],
                providers: [
                    YearPeriodService
                ]
            })
            .overrideTemplate(YearPeriodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearPeriodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearPeriodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new YearPeriod(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.yearPeriods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
