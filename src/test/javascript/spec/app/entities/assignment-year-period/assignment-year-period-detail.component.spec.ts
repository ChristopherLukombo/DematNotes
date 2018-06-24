/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentYearPeriodDetailComponent } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period-detail.component';
import { AssignmentYearPeriodService } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.service';
import { AssignmentYearPeriod } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.model';

describe('Component Tests', () => {

    describe('AssignmentYearPeriod Management Detail Component', () => {
        let comp: AssignmentYearPeriodDetailComponent;
        let fixture: ComponentFixture<AssignmentYearPeriodDetailComponent>;
        let service: AssignmentYearPeriodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentYearPeriodDetailComponent],
                providers: [
                    AssignmentYearPeriodService
                ]
            })
            .overrideTemplate(AssignmentYearPeriodDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentYearPeriodDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentYearPeriodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AssignmentYearPeriod(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.assignmentYearPeriod).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
