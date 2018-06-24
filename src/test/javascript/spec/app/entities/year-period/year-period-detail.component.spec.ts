/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { YearPeriodDetailComponent } from '../../../../../../main/webapp/app/entities/year-period/year-period-detail.component';
import { YearPeriodService } from '../../../../../../main/webapp/app/entities/year-period/year-period.service';
import { YearPeriod } from '../../../../../../main/webapp/app/entities/year-period/year-period.model';

describe('Component Tests', () => {

    describe('YearPeriod Management Detail Component', () => {
        let comp: YearPeriodDetailComponent;
        let fixture: ComponentFixture<YearPeriodDetailComponent>;
        let service: YearPeriodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [YearPeriodDetailComponent],
                providers: [
                    YearPeriodService
                ]
            })
            .overrideTemplate(YearPeriodDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(YearPeriodDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(YearPeriodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new YearPeriod(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.yearPeriod).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
