/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { AbsenceMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix-detail.component';
import { AbsenceMySuffixService } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix.service';
import { AbsenceMySuffix } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix.model';

describe('Component Tests', () => {

    describe('AbsenceMySuffix Management Detail Component', () => {
        let comp: AbsenceMySuffixDetailComponent;
        let fixture: ComponentFixture<AbsenceMySuffixDetailComponent>;
        let service: AbsenceMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AbsenceMySuffixDetailComponent],
                providers: [
                    AbsenceMySuffixService
                ]
            })
            .overrideTemplate(AbsenceMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbsenceMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbsenceMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AbsenceMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.absence).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
