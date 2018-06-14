import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {MarksService} from './marks.service';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {Evaluation, EvaluationService} from '../entities/evaluation';
import {DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {FormControl} from '@angular/forms';
import {Module} from '../entities/module';

@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html'
})
export class MarksComponent implements OnInit {
    currentUser: any;
    currentUserReport: any;
    currentUserGraph: any;

    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];

    schoolsReport: School[] = [];
    classroomsReport: Classroom[] = [];
    usersReport: User[] = [];

    schoolsGraph: School[] = [];
    classroomsGraph: Classroom[] = [];
    usersGraph: User[] = [];

    schoolSelected;
    classroomSelected;
    userSelected;

    schoolSelectedReport;
    classroomSelectedReport;
    userSelectedReport;

    schoolSelectedGraph;
    classroomSelectedGraph;
    userSelectedGraph;

    marks: string[] = Array<string>(this.users.length);
    comments: string[] = Array<string>(this.users.length);

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

    yearPeriod: string;

    // chartLabels = ['January', 'February', 'Mars', 'April'];

    containsData = false;

    myControl: FormControl = new FormControl();

    modules: Module[];

    idModule: number;

    constructor(
        private principal: Principal,
        private marksService: MarksService,
        private evaluationService: EvaluationService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadCurrentUser();
        this.loadCurrentUserReport();
        this.loadCurrentUserGraph();
    }

    onChartClick(event): void {
        console.log(event);
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.marksService.getSchoolsByCurrentUserTeacher(account.id).subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });

            this.marksService.getModules(account.id).subscribe((modules) => {
                this.modules = modules;
            }, (error) => {
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
                (schools) => {
                    this.schoolsReport = schools;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
        });
    }

    private loadCurrentUserGraph(): void {
        this.principal.identity().then((account) => {
            this.currentUserGraph = account;
            this.marksService.getSchoolsByCurrentUserTeacher(
                account.id
            ).subscribe(
                (schools) => {
                    this.schoolsGraph = schools;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
        });
    }

    public loadChartData(): void {
        this.marksService.getData(
            this.schoolSelectedGraph,
            this.classroomSelectedGraph
        ).subscribe(
            (chartData) => {
                this.containsData = true;
                this.chartData = chartData as any [];
                console.log(this.chartData);
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            }
        );
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

    getClassroomsByCurrentUserTeacherReport(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(
            this.currentUserReport.id,
            this.schoolSelectedReport
        ).subscribe((classrooms) => {
            this.userSelectedReport = undefined;
            this.classroomSelectedReport = undefined;
            this.classroomsReport = classrooms;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getClassroomsByCurrentUserTeacherGraph(): void {
        this.marksService.getClassroomsByCurrentUserTeacher(
            this.currentUserGraph.id,
            this.schoolSelectedGraph
        ).subscribe((classrooms) => {
            this.userSelectedGraph = undefined;
            this.classroomSelectedGraph = undefined;
            this.classroomsGraph = classrooms;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacher(): void {
        this.marksService.getStudentsUserByCurrentUserTeacher(
            this.currentUser.id,
            this.schoolSelected,
            this.classroomSelected
        ).subscribe((users) => {
            this.users = users;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacherReport(): void {
        this.marksService.getStudentsUserByCurrentUserTeacher(
            this.currentUserReport.id,
            this.schoolSelectedReport,
            this.classroomSelectedReport
        ).subscribe((user) => {
            this.usersReport = user;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacherGraph(): void {
        console.log( this.classroomSelectedGraph);
        this.marksService.getStudentsUserByCurrentUserTeacher(
            this.currentUserGraph.id,
            this.schoolSelectedGraph,
            this.classroomSelectedGraph
        ).subscribe((users) => {
            this.usersGraph = users;
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacher(): void {
        this.marksService.getStudentUserByIdUser(
            this.userSelected
        ).subscribe((users) => {
            this.users = new Array<User>();
            this.users.push(users);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacherReport(): void {
        this.marksService.getStudentUserByIdUser(
            this.userSelected
        ).subscribe((user) => {
            this.usersReport = new Array<User>();
            this.usersReport.push(user);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacherGraph(): void {
        this.marksService.getStudentUserByIdUser(
            this.userSelectedGraph
        ).subscribe((user) => {
            this.usersGraph = new Array<User>();
            this.usersGraph.push(user);
            this.loadChartData();
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    /**
     * Save marks
     */
    saveMarks(): void {
        for (let i = 0; i < this.marks.length; i++) {
            if (undefined !== this.marks[i]) {
                if (!this.isNumber(this.marks[i].trim())) {
                    alert('Saisir une moyenne valide');
                    return;
                } else if (parseFloat(this.marks[i].trim()) < 0 || parseFloat(this.marks[i].trim()) > 20) {
                    alert('Saisir une moyenne entre 0 et 20');
                    return;
                }  else {
                    this.marksService.getStudentByIdUser(i).subscribe(
                        (student) => {
                            const e = new Evaluation(
                                null,
                                parseFloat(this.marks[i].trim()),
                                new Date().toISOString().slice(0, 16),
                                (this.comments[i] != null && this.comments[i].trim().length > 0) ? this.comments[i].trim() : '',
                                this.yearPeriod,
                               null,
                                student.id,
                                this.idModule,
                                null
                            );

                            this.evaluationService.create(e).subscribe(
                                (evaluation) => {
                                    if (i === this.marks.length - 1 && evaluation) {
                                        alert('Moyenne enregistrée');
                                    }
                                }, (firstError) => {
                                    console.log(JSON.parse(firstError.body).message);
                                });

                        }, (secondError) => {
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
