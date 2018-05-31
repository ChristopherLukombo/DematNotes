/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { InterventionMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix-detail.component';
import { InterventionMySuffixService } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.service';
import { InterventionMySuffix } from '../../../../../../main/webapp/app/entities/intervention-my-suffix/intervention-my-suffix.model';

describe('Component Tests', () => {

    describe('InterventionMySuffix Management Detail Component', () => {
        let comp: InterventionMySuffixDetailComponent;
        let fixture: ComponentFixture<InterventionMySuffixDetailComponent>;
        let service: InterventionMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InterventionMySuffixDetailComponent],
                providers: [
                    InterventionMySuffixService
                ]
            })
            .overrideTemplate(InterventionMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InterventionMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InterventionMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InterventionMySuffix(123)
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
