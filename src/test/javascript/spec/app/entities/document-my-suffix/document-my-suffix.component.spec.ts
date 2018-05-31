/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { DocumentMySuffixComponent } from '../../../../../../main/webapp/app/entities/document-my-suffix/document-my-suffix.component';
import { DocumentMySuffixService } from '../../../../../../main/webapp/app/entities/document-my-suffix/document-my-suffix.service';
import { DocumentMySuffix } from '../../../../../../main/webapp/app/entities/document-my-suffix/document-my-suffix.model';

describe('Component Tests', () => {

    describe('DocumentMySuffix Management Component', () => {
        let comp: DocumentMySuffixComponent;
        let fixture: ComponentFixture<DocumentMySuffixComponent>;
        let service: DocumentMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [DocumentMySuffixComponent],
                providers: [
                    DocumentMySuffixService
                ]
            })
            .overrideTemplate(DocumentMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
