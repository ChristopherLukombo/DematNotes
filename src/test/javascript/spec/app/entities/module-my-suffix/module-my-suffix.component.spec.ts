/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { ModuleMySuffixComponent } from '../../../../../../main/webapp/app/entities/module-my-suffix/module-my-suffix.component';
import { ModuleMySuffixService } from '../../../../../../main/webapp/app/entities/module-my-suffix/module-my-suffix.service';
import { ModuleMySuffix } from '../../../../../../main/webapp/app/entities/module-my-suffix/module-my-suffix.model';

describe('Component Tests', () => {

    describe('ModuleMySuffix Management Component', () => {
        let comp: ModuleMySuffixComponent;
        let fixture: ComponentFixture<ModuleMySuffixComponent>;
        let service: ModuleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ModuleMySuffixComponent],
                providers: [
                    ModuleMySuffixService
                ]
            })
            .overrideTemplate(ModuleMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuleMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ModuleMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.modules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
