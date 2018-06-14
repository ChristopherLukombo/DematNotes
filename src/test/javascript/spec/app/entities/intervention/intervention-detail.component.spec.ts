/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { InterventionDetailComponent } from '../../../../../../main/webapp/app/entities/intervention/intervention-detail.component';
import { InterventionService } from '../../../../../../main/webapp/app/entities/intervention/intervention.service';
import { Intervention } from '../../../../../../main/webapp/app/entities/intervention/intervention.model';

describe('Component Tests', () => {

    describe('Intervention Management Detail Component', () => {
        let comp: InterventionDetailComponent;
        let fixture: ComponentFixture<InterventionDetailComponent>;
        let service: InterventionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InterventionDetailComponent],
                providers: [
                    InterventionService
                ]
            })
            .overrideTemplate(InterventionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterventionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterventionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Intervention(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.intervention).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
