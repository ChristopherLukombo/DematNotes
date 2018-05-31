/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { AbsenceMySuffixComponent } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix.component';
import { AbsenceMySuffixService } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix.service';
import { AbsenceMySuffix } from '../../../../../../main/webapp/app/entities/absence-my-suffix/absence-my-suffix.model';

describe('Component Tests', () => {

    describe('AbsenceMySuffix Management Component', () => {
        let comp: AbsenceMySuffixComponent;
        let fixture: ComponentFixture<AbsenceMySuffixComponent>;
        let service: AbsenceMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AbsenceMySuffixComponent],
                providers: [
                    AbsenceMySuffixService
                ]
            })
            .overrideTemplate(AbsenceMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AbsenceMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AbsenceMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AbsenceMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.absences[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
