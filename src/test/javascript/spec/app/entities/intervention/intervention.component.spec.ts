/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { InterventionComponent } from '../../../../../../main/webapp/app/entities/intervention/intervention.component';
import { InterventionService } from '../../../../../../main/webapp/app/entities/intervention/intervention.service';
import { Intervention } from '../../../../../../main/webapp/app/entities/intervention/intervention.model';

describe('Component Tests', () => {

    describe('Intervention Management Component', () => {
        let comp: InterventionComponent;
        let fixture: ComponentFixture<InterventionComponent>;
        let service: InterventionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InterventionComponent],
                providers: [
                    InterventionService
                ]
            })
            .overrideTemplate(InterventionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterventionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterventionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Intervention(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.interventions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
