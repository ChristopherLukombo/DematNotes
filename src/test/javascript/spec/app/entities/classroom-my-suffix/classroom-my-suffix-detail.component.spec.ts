/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DematNotesTestModule } from '../../../test.module';
import { ClassroomMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix-detail.component';
import { ClassroomMySuffixService } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix.service';
import { ClassroomMySuffix } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix.model';

describe('Component Tests', () => {

    describe('ClassroomMySuffix Management Detail Component', () => {
        let comp: ClassroomMySuffixDetailComponent;
        let fixture: ComponentFixture<ClassroomMySuffixDetailComponent>;
        let service: ClassroomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ClassroomMySuffixDetailComponent],
                providers: [
                    ClassroomMySuffixService
                ]
            })
            .overrideTemplate(ClassroomMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClassroomMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.classroom).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
