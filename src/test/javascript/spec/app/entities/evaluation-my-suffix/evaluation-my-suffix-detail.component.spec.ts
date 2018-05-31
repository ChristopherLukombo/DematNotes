/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { EvaluationMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix-detail.component';
import { EvaluationMySuffixService } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.service';
import { EvaluationMySuffix } from '../../../../../../main/webapp/app/entities/evaluation-my-suffix/evaluation-my-suffix.model';

describe('Component Tests', () => {

    describe('EvaluationMySuffix Management Detail Component', () => {
        let comp: EvaluationMySuffixDetailComponent;
        let fixture: ComponentFixture<EvaluationMySuffixDetailComponent>;
        let service: EvaluationMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [EvaluationMySuffixDetailComponent],
                providers: [
                    EvaluationMySuffixService
                ]
            })
            .overrideTemplate(EvaluationMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EvaluationMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EvaluationMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.evaluation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
