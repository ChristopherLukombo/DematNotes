import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogComponent} from '../dialog/dialog.component';
import {Absence} from '../entities/absence';
import {DelayStudent} from '../entities/delay-student';
import {Services} from '../services';

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
        private services: Services,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public dialog: MatDialog,
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

            this.services.getStudentByIdUser(account.id).subscribe((student) => {
                if (student) {
                    this.services.getAbsencesByStudent(student.id).subscribe((absences) => {
                        this.absences = absences;
                    }, (secondError) => {
                        console.log(JSON.parse(secondError.body).message);
                    });
                    this.services.getDelayStudentsByStudent(student.id).subscribe((delayStudents) => {
                        this.delayStudents = delayStudents;
                    }, (secondError) => {
                        console.log(JSON.parse(secondError.body).message);
                    });
                }
            }, (firstError) => {
                console.log(JSON.parse(firstError.body).message);
            });

            this.services.getSchoolsByTeacher(
                account.id
            ).subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
        });
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.services.getClassroomsByTeacher(
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
        this.services.getStudentsByTeacher(
            this.currentUser.id,
            this.schoolSelected,
            this.classroomSelected).subscribe((users) => {
            this.users = users;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.services.getStudentUserByIdUser(
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
