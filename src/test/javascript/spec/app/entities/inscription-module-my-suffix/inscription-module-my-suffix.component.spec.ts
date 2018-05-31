/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionModuleMySuffixComponent } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.component';
import { InscriptionModuleMySuffixService } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.service';
import { InscriptionModuleMySuffix } from '../../../../../../main/webapp/app/entities/inscription-module-my-suffix/inscription-module-my-suffix.model';

describe('Component Tests', () => {

    describe('InscriptionModuleMySuffix Management Component', () => {
        let comp: InscriptionModuleMySuffixComponent;
        let fixture: ComponentFixture<InscriptionModuleMySuffixComponent>;
        let service: InscriptionModuleMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionModuleMySuffixComponent],
                providers: [
                    InscriptionModuleMySuffixService
                ]
            })
            .overrideTemplate(InscriptionModuleMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionModuleMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionModuleMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InscriptionModuleMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inscriptionModules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
