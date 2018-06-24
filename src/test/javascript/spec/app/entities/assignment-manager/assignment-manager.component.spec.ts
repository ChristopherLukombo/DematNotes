/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentManagerComponent } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager.component';
import { AssignmentManagerService } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager.service';
import { AssignmentManager } from '../../../../../../main/webapp/app/entities/assignment-manager/assignment-manager.model';

describe('Component Tests', () => {

    describe('AssignmentManager Management Component', () => {
        let comp: AssignmentManagerComponent;
        let fixture: ComponentFixture<AssignmentManagerComponent>;
        let service: AssignmentManagerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentManagerComponent],
                providers: [
                    AssignmentManagerService
                ]
            })
            .overrideTemplate(AssignmentManagerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentManagerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentManagerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AssignmentManager(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.assignmentManagers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
