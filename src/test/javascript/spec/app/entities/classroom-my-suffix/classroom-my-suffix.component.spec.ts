/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DematNotesTestModule } from '../../../test.module';
import { ClassroomMySuffixComponent } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix.component';
import { ClassroomMySuffixService } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix.service';
import { ClassroomMySuffix } from '../../../../../../main/webapp/app/entities/classroom-my-suffix/classroom-my-suffix.model';

describe('Component Tests', () => {

    describe('ClassroomMySuffix Management Component', () => {
        let comp: ClassroomMySuffixComponent;
        let fixture: ComponentFixture<ClassroomMySuffixComponent>;
        let service: ClassroomMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DematNotesTestModule],
                declarations: [ClassroomMySuffixComponent],
                providers: [
                    ClassroomMySuffixService
                ]
            })
            .overrideTemplate(ClassroomMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClassroomMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClassroomMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClassroomMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.classrooms[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
