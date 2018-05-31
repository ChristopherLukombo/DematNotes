/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { EvaluationMySuffixComponent } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.component';
import { EvaluationMySuffixService } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.service';
import { EvaluationMySuffix } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.model';

describe('Component Tests', () => {

    describe('EvaluationMySuffix Management Component', () => {
        let comp: EvaluationMySuffixComponent;
        let fixture: ComponentFixture<EvaluationMySuffixComponent>;
        let service: EvaluationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [EvaluationMySuffixComponent],
                providers: [
                    EvaluationMySuffixService
                ]
            })
            .overrideTemplate(EvaluationMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EvaluationMySuffix(123)],
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
