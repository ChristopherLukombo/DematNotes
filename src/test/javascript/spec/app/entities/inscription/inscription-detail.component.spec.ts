/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionDetailComponent } from '../../../../../../main/webapp/app/entities/inscription/inscription-detail.component';
import { InscriptionService } from '../../../../../../main/webapp/app/entities/inscription/inscription.service';
import { Inscription } from '../../../../../../main/webapp/app/entities/inscription/inscription.model';

describe('Component Tests', () => {

    describe('Inscription Management Detail Component', () => {
        let comp: InscriptionDetailComponent;
        let fixture: ComponentFixture<InscriptionDetailComponent>;
        let service: InscriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionDetailComponent],
                providers: [
                    InscriptionService
                ]
            })
            .overrideTemplate(InscriptionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Inscription(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.inscription).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
