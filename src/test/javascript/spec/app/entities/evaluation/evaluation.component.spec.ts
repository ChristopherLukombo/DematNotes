/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { EvaluationComponent } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.component';
import { EvaluationService } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.service';
import { Evaluation } from '../../../../../../main/webapp/app/entities/evaluation/evaluation.model';

describe('Component Tests', () => {

    describe('Evaluation Management Component', () => {
        let comp: EvaluationComponent;
        let fixture: ComponentFixture<EvaluationComponent>;
        let service: EvaluationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [EvaluationComponent],
                providers: [
                    EvaluationService
                ]
            })
            .overrideTemplate(EvaluationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Evaluation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.evaluations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
