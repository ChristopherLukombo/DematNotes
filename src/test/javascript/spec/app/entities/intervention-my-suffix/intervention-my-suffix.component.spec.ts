/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { InterventionMySuffixComponent } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.component';
import { InterventionMySuffixService } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.service';
import { InterventionMySuffix } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.model';

describe('Component Tests', () => {

    describe('InterventionMySuffix Management Component', () => {
        let comp: InterventionMySuffixComponent;
        let fixture: ComponentFixture<InterventionMySuffixComponent>;
        let service: InterventionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InterventionMySuffixComponent],
                providers: [
                    InterventionMySuffixService
                ]
            })
            .overrideTemplate(InterventionMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterventionMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterventionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InterventionMySuffix(123)],
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
