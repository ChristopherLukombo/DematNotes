/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { AssignmentModuleDetailComponent } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module-detail.component';
import { AssignmentModuleService } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.service';
import { AssignmentModule } from '../../../../../../main/webapp/app/entities/assignment-module/assignment-module.model';

describe('Component Tests', () => {

    describe('AssignmentModule Management Detail Component', () => {
        let comp: AssignmentModuleDetailComponent;
        let fixture: ComponentFixture<AssignmentModuleDetailComponent>;
        let service: AssignmentModuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [AssignmentModuleDetailComponent],
                providers: [
                    AssignmentModuleService
                ]
            })
            .overrideTemplate(AssignmentModuleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssignmentModuleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentModuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AssignmentModule(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.assignmentModule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
