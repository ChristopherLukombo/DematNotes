/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { DocumentMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/document-my-suffix/document-my-suffix-detail.component';
import { DocumentMySuffixService } from '../../../../../../main/webapp/app/entities/document-my-suffix/document-my-suffix.service';
import { DocumentMySuffix } from '../../../../../../main/webapp/app/entities/document-my-suffix/document-my-suffix.model';

describe('Component Tests', () => {

    describe('DocumentMySuffix Management Detail Component', () => {
        let comp: DocumentMySuffixDetailComponent;
        let fixture: ComponentFixture<DocumentMySuffixDetailComponent>;
        let service: DocumentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DocumentMySuffixDetailComponent],
                providers: [
                    DocumentMySuffixService
                ]
            })
            .overrideTemplate(DocumentMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.document).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
