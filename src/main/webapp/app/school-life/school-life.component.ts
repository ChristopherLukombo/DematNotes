import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {MarksService} from '../marks/marks.service';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {EvaluationService} from '../entities/evaluation';
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
    // coefficients: string[] = Array<string>(this.users.length);

    absences: Absence[];
    delayStudents: DelayStudent[];

    constructor(
        private principal: Principal,
        private marksService: MarksService,
        private evaluationService: EvaluationService,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public dialog: MatDialog,
        private schoolLifeService: SchoolLifeService
    ) {
        // Loading of encrypted icons
        // this.iconRegistry.addSvgIcon(
        //     'printer',
        //     this.sanitizer.bypassSecurityTrustResourceUrl('content/c11b97db8f0e59c9940351c914c4bec9.svg'));
        this.iconRegistry.addSvgIcon(
            'upload',
            this.sanitizer.bypassSecurityTrustResourceUrl('content/4d599ba6bf2eb50c397d5aefd3b20e00.svg'));
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

            this.marksService.getSchoolsByCurrentUserTeacher(
                account.id
            ).subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
        });
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(
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
        this.marksService.getStudentsUserByCurrentUserTeacher(
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
                this.users = new Array<User>();
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

    saveAbsences() {
        // for (let i = 0; i < this.marks.length; i++) {
        //     if (undefined !== this.marks[i]) {
        //         if (!this.isNumber(this.marks[i].trim())) {
        //             alert('Saisir une moyenne valide');
        //             return;
        //         } else if (parseFloat(this.marks[i].trim()) < 0 || parseFloat(this.marks[i].trim()) > 20) {
        //             alert('Saisir une moyenne entre 0 et 20');
        //             return;
        //         } else if (!this.isNumber(this.coefficients[i].trim())) {
        //             alert('Saisir un coefficient valide');
        //             return;
        //         } else if (parseFloat(this.coefficients[i].trim()) < 0 || parseFloat(this.coefficients[i].trim()) > 15) {
        //             alert('Saisir un coefficient entre 0 et 15');
        //             return;
        //         } else  {
        //             this.marksService.getStudentByIdUser(i).subscribe((student) => {
        //                 const e = new Evaluation(
        //                     null,
        //                     parseFloat(this.marks[i].trim()),
        //                     new Date().toISOString().slice(0, 16),
        //                     this.comments[i].trim(),
        //                     null,
        //                     null,
        //                     student.id,
        //                     null,
        //                     null
        //                 );
        //
        //                 this.evaluationService.create(e).subscribe((evaluation) => {
        //                     if (i === this.marks.length - 1  && evaluation) {
        //                         alert('Moyenne enregistré' + evaluation);
        //                     }
        //                 }, (firstError) => {
        //                     console.log(JSON.parse(firstError.body).message);
        //                 });
        //
        //             }, (secondError) => {
        //                 console.log(JSON.parse(secondError.body).message);
        //             });
        //         }
        //     }
        // }
    }

    isNumber(value: string) {
        let valid = true;
        try {
            parseFloat(value);
        } catch (error) {
            valid = false;
        }
        return valid;
    }
}
