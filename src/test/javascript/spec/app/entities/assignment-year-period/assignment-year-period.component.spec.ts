/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentYearPeriodComponent } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.component';
import { AssignmentYearPeriodService } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.service';
import { AssignmentYearPeriod } from '../../../../../../main/webapp/app/entities/assignment-year-period/assignment-year-period.model';

describe('Component Tests', () => {

    describe('AssignmentYearPeriod Management Component', () => {
        let comp: AssignmentYearPeriodComponent;
        let fixture: ComponentFixture<AssignmentYearPeriodComponent>;
        let service: AssignmentYearPeriodService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentYearPeriodComponent],
                providers: [
                    AssignmentYearPeriodService
                ]
            })
            .overrideTemplate(AssignmentYearPeriodComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentYearPeriodComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentYearPeriodService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AssignmentYearPeriod(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.assignmentYearPeriods[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
