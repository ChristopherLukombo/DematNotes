/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { ManagerMySuffixComponent } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix.component';
import { ManagerMySuffixService } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix.service';
import { ManagerMySuffix } from '../../../../../../main/webapp/app/entities/manager-my-suffix/manager-my-suffix.model';

describe('Component Tests', () => {

    describe('ManagerMySuffix Management Component', () => {
        let comp: ManagerMySuffixComponent;
        let fixture: ComponentFixture<ManagerMySuffixComponent>;
        let service: ManagerMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ManagerMySuffixComponent],
                providers: [
                    ManagerMySuffixService
                ]
            })
            .overrideTemplate(ManagerMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ManagerMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ManagerMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ManagerMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.managers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
