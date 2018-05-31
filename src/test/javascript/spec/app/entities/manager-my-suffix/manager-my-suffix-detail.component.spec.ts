/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { ManagerMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix-detail.component';
import { ManagerMySuffixService } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix.service';
import { ManagerMySuffix } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix.model';

describe('Component Tests', () => {

    describe('ManagerMySuffix Management Detail Component', () => {
        let comp: ManagerMySuffixDetailComponent;
        let fixture: ComponentFixture<ManagerMySuffixDetailComponent>;
        let service: ManagerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ManagerMySuffixDetailComponent],
                providers: [
                    ManagerMySuffixService
                ]
            })
            .overrideTemplate(ManagerMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ManagerMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ManagerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ManagerMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.manager).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
