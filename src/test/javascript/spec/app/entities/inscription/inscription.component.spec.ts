/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { InscriptionComponent } from '../../../../../../main/webapp/app/entities/inscription/inscription.component';
import { InscriptionService } from '../../../../../../main/webapp/app/entities/inscription/inscription.service';
import { Inscription } from '../../../../../../main/webapp/app/entities/inscription/inscription.model';

describe('Component Tests', () => {

    describe('Inscription Management Component', () => {
        let comp: InscriptionComponent;
        let fixture: ComponentFixture<InscriptionComponent>;
        let service: InscriptionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [InscriptionComponent],
                providers: [
                    InscriptionService
                ]
            })
            .overrideTemplate(InscriptionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscriptionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscriptionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Inscription(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.inscriptions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
