import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {MarksService} from '../marks/marks.service';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from '../dialog/dialog.component';
import {SchoolLifeService} from './school-life.service';
import {Absence} from '../entities/absence';
import {DelayStudent} from '../entities/delay-student';

@Component({
    selector: 'jhi-school-life',
    templateUrl: './school-life.component.html'
})
export class SchoolLifeComponent implements OnInit {
    currentUser: any;

    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];

    schoolSelected;
    classroomSelected;
    userSelected;

    marks: string[] = Array<string>(this.users.length);
    comments: string[] = Array<string>(this.users.length);

    absences: Absence[];
    delayStudents: DelayStudent[];

    constructor(
        private principal: Principal,
        private marksService: MarksService,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public dialog: MatDialog,
        private schoolLifeService: SchoolLifeService
    ) {
        this.iconRegistry.addSvgIcon(
            'upload',
            this.sanitizer.bypassSecurityTrustResourceUrl('../../content/4d599ba6bf2eb50c397d5aefd3b20e00.svg'));
    }

    ngOnInit(): void {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;

            this.marksService.getStudentByIdUser(account.id).subscribe((student) => {
                if (student) {
                    this.schoolLifeService.getAbsencesByStudent(student.id).subscribe((absences) => {
                        this.absences = absences;
                    }, (secondError) => {
                        console.log(JSON.parse(secondError.body).message);
                    });
                    this.schoolLifeService.getDelayStudentsByStudent(student.id).subscribe((delayStudents) => {
                        this.delayStudents = delayStudents;
                    }, (secondError) => {
                        console.log(JSON.parse(secondError.body).message);
                    });
                }
            }, (firstError) => {
                console.log(JSON.parse(firstError.body).message);
            });

            this.marksService.getSchoolsByTeacher(
                account.id
            ).subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
        });
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.marksService.getClassroomsByTeacher(
            this.currentUser.id,
            this.schoolSelected
        ).subscribe((classrooms) => {
            this.userSelected = undefined;
            this.classroomSelected = undefined;
            this.classrooms = classrooms;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacher(): void {
        this.marksService.getStudentsByTeacher(
            this.currentUser.id,
            this.schoolSelected,
            this.classroomSelected).subscribe((users) => {
            this.users = users;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.marksService.getStudentUserByIdUser(
            this.userSelected
        ).subscribe(
            (users) => {
                this.users = [];
                this.users.push(users);
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    /**
     * Open a popUp
     */
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '850px',
            height: '800'
        });
        dialogRef.afterClosed().subscribe((response) => {
            console.log('The dialog was closed');
            console.log(response);
        });
    }

}
