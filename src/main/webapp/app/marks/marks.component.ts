import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {MarksService} from './marks.service';
import {User} from '../shared/user/user.model';
import {SchoolMySuffix} from '../entities/school-my-suffix';
import {ClassroomMySuffix} from '../entities/classroom-my-suffix';
import {EvaluationMySuffix, EvaluationMySuffixService} from '../entities/evaluation-my-suffix';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html'
})
export class MarksComponent implements OnInit {
    currentUser: any;
    currentUserReport: any;

    schools: SchoolMySuffix[] = [];
    classrooms: ClassroomMySuffix[] = [];
    users: User[] = [];

    schoolsReport: SchoolMySuffix[] = [];
    classroomsReport: ClassroomMySuffix[] = [];
    usersReport: User[] = [];

    schoolSelected;
    classroomSelected;
    userSelected;

    schoolSelectedReport;
    classroomSelectedReport;
    userSelectedReport;

    marks: string[] = Array<string>(this.users.length);
    comments: string[] = Array<string>(this.users.length);
    coefficients: string[] = Array<string>(this.users.length);

    // marksReport: string[] = Array<string>(this.usersReport.length);
    // commentsReport: string[] = Array<string>(this.usersReport.length);
    // coefficientsReport: string[] = Array<string>(this.usersReport.length);

    chartOptions = {
        responsive: true
    };

    chartData = [
        {
            label: '',
            data: [],
        }
    ];

    // chartLabels = ['January', 'February', 'Mars', 'April'];


    constructor(
        private principal: Principal,
        private marksService: MarksService,
        private evaluationService: EvaluationMySuffixService,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public dialog: MatDialog
    ) {
        // Loading of encrypted icons
        this.iconRegistry.addSvgIcon(
            'printer',
            this.sanitizer.bypassSecurityTrustResourceUrl('content/c11b97db8f0e59c9940351c914c4bec9.svg'));
        this.iconRegistry.addSvgIcon(
            'upload',
            this.sanitizer.bypassSecurityTrustResourceUrl('content/4d599ba6bf2eb50c397d5aefd3b20e00.svg'));
    }

    ngOnInit(): void {
        this.loadCurrentUser();
        this.loadCurrentUserReport();
        this.loadChartData();
    }

    /**
     * Open a popUp
     */
    openDialog(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '250px',
        });
        dialogRef.afterClosed().subscribe((response) => {
            console.log('The dialog was closed');
            console.log(response);
        });
    }

    onChartClick(event): void {
        console.log(event);
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.marksService.getSchoolsByCurrentUserTeacher(account.id).subscribe(schools => {
                this.schools = schools;
            }, error => {
                console.log(JSON.parse(error.body).message);
            });
        });
    }

    private loadCurrentUserReport(): void {
        this.principal.identity().then((account) => {
            this.currentUserReport = account;
            this.marksService.getSchoolsByCurrentUserTeacher(
                account.id
            ).subscribe(
                schools => {
                    this.schoolsReport = schools;
                }, error => {
                    console.log(JSON.parse(error.body).message);
                });
        });
    }

    private loadChartData(): void {
        this.marksService.getData(
            1101,
            1301
        ).subscribe(chartData => {
                // this.chartData = response;
                this.chartData = chartData as any [];
            }, error => {
                console.log(JSON.parse(error.body).message);
            }
        );
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(
            this.currentUser.id,
            this.schoolSelected
        ).subscribe(classrooms => {
            this.userSelected = undefined;
            this.classroomSelected = undefined;
            this.classrooms = classrooms;
        }, error => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getClassroomsByCurrentUserTeacherReport(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(
            this.currentUserReport.id,
            this.schoolSelectedReport
        ).subscribe(classrooms => {
            this.userSelectedReport = undefined;
            this.classroomSelectedReport = undefined;
            this.classroomsReport = classrooms;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacher(): void {
        this.marksService.getStudentsUserByCurrentUserTeacher(
            this.currentUser.id,
            this.schoolSelected,
            this.classroomSelected
        ).subscribe(users => {
            this.users = users;
        }, error => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacherReport(): void {
        this.marksService.getStudentsUserByCurrentUserTeacher(
            this.currentUserReport.id,
            this.schoolSelectedReport,
            this.classroomSelectedReport
        ).subscribe(user => {
            this.usersReport = user;
        }, error => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.marksService.getStudentUserByIdUser(
            this.userSelected
        ).subscribe(users => {
            this.users = new Array<User>();
            this.users.push(users);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacherReport(): void {
        this.marksService.getStudentUserByIdUser(
            this.userSelected
        ).subscribe(user => {
            this.usersReport = new Array<User>();
            this.usersReport.push(user);
        }, error => {
            console.log(JSON.parse(error.body).message);
        });
    }

    /**
     * Save marks
     */
    saveMarks(): void {
        for (let i = 0; i < this.marks.length; i++) {
            if (undefined !== this.marks[i]  && undefined !== this.coefficients[i]) {
                if (!this.isNumber(this.marks[i].trim())) {
                    alert('Saisir une moyenne valide');
                    return;
                } else if (parseFloat(this.marks[i].trim()) < 0 || parseFloat(this.marks[i].trim()) > 20) {
                    alert('Saisir une moyenne entre 0 et 20');
                    return;
                } else if (!this.isNumber(this.coefficients[i].trim())) {
                    alert('Saisir un coefficient valide');
                    return;
                } else if (parseFloat(this.coefficients[i].trim()) < 0 || parseFloat(this.coefficients[i].trim()) > 15) {
                    alert('Saisir un coefficient entre 0 et 15');
                    return;
                } else {
                    this.marksService.getStudentByIdUser(i).subscribe(
                        student => {
                            const evaluation = new EvaluationMySuffix(
                                null,
                                parseFloat(this.marks[i].trim()),
                                parseFloat(this.coefficients[i].trim()),
                                new Date().toISOString().slice(0, 16),
                                this.comments[i].trim(),
                                null,
                                student.id,
                                null
                            );

                            this.evaluationService.create(evaluation).subscribe(
                                evaluation => {
                                    if (i === this.marks.length - 1) {
                                        alert('Moyenne enregistrée');
                                    }
                                }, firstError => {
                                    console.log(JSON.parse(firstError.body).message);
                                });

                        }, secondError => {
                            console.log(JSON.parse(secondError.body).message);
                        });

                }
            }
        }
    }

    /**
     * Return true if value is a number
     * @param {string} value to check if is number
     * @returns {boolean}
     */
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
