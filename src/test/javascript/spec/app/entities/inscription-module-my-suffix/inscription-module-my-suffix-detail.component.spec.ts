/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionModuleMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix-detail.component';
import { InscriptionModuleMySuffixService } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.service';
import { InscriptionModuleMySuffix } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.model';

describe('Component Tests', () => {

    describe('InscriptionModuleMySuffix Management Detail Component', () => {
        let comp: InscriptionModuleMySuffixDetailComponent;
        let fixture: ComponentFixture<InscriptionModuleMySuffixDetailComponent>;
        let service: InscriptionModuleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionModuleMySuffixDetailComponent],
                providers: [
                    InscriptionModuleMySuffixService
                ]
            })
            .overrideTemplate(InscriptionModuleMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionModuleMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionModuleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InscriptionModuleMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inscriptionModule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
