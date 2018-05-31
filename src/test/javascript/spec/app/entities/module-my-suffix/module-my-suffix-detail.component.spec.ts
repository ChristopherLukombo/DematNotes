/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { ModuleMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/module-my-suffix/module-my-suffix-detail.component';
import { ModuleMySuffixService } from '../../../../../../main/webapp/app/entities/module-my-suffix/module-my-suffix.service';
import { ModuleMySuffix } from '../../../../../../main/webapp/app/entities/module-my-suffix/module-my-suffix.model';

describe('Component Tests', () => {

    describe('ModuleMySuffix Management Detail Component', () => {
        let comp: ModuleMySuffixDetailComponent;
        let fixture: ComponentFixture<ModuleMySuffixDetailComponent>;
        let service: ModuleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ModuleMySuffixDetailComponent],
                providers: [
                    ModuleMySuffixService
                ]
            })
            .overrideTemplate(ModuleMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuleMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ModuleMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.module).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
