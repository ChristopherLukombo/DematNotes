/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { SchoolMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/school-my-suffix/school-my-suffix-detail.component';
import { SchoolMySuffixService } from '../../../../../../main/webapp/app/entities/school-my-suffix/school-my-suffix.service';
import { SchoolMySuffix } from '../../../../../../main/webapp/app/entities/school-my-suffix/school-my-suffix.model';

describe('Component Tests', () => {

    describe('SchoolMySuffix Management Detail Component', () => {
        let comp: SchoolMySuffixDetailComponent;
        let fixture: ComponentFixture<SchoolMySuffixDetailComponent>;
        let service: SchoolMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [SchoolMySuffixDetailComponent],
                providers: [
                    SchoolMySuffixService
                ]
            })
            .overrideTemplate(SchoolMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SchoolMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SchoolMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SchoolMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.school).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
