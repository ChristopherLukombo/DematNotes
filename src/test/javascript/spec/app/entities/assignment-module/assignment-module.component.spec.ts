/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentModuleComponent } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.component';
import { AssignmentModuleService } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.service';
import { AssignmentModule } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.model';

describe('Component Tests', () => {

    describe('AssignmentModule Management Component', () => {
        let comp: AssignmentModuleComponent;
        let fixture: ComponentFixture<AssignmentModuleComponent>;
        let service: AssignmentModuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentModuleComponent],
                providers: [
                    AssignmentModuleService
                ]
            })
            .overrideTemplate(AssignmentModuleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentModuleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentModuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AssignmentModule(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.assignmentModules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
