import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {Evaluation, EvaluationService} from '../entities/evaluation';
import {MatDialog} from '@angular/material';
import {Module} from '../entities/module';
import {Services} from '../services';

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

    modules: Module[];

    idModule: number;

    constructor(
        private principal: Principal,
        private services: Services,
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
            this.services.getSchoolsByTeacher(account.id).subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });

            this.services.getModules(account.id).subscribe((modules) => {
                this.modules = modules;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
        });
    }

    private loadCurrentUserReport(): void {
        this.principal.identity().then((account) => {
            this.currentUserReport = account;
            this.services.getSchoolsByTeacher(
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
            this.services.getSchoolsByTeacher(
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
        this.services.getData(
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

    getClassroomsByCurrentUserTeacherReport(): void {
        this.services.getClassroomsByTeacher(
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
        this.services.getClassroomsByTeacher(
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
        this.services.getStudentsByTeacher(
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
        this.services.getStudentsByTeacher(
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
        this.services.getStudentsByTeacher(
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
        this.services.getStudentUserByIdUser(
            this.userSelected
        ).subscribe((users) => {
            this.users = [];
            this.users.push(users);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacherReport(): void {
        this.services.getStudentUserByIdUser(
            this.userSelectedReport
        ).subscribe((user) => {
            this.usersReport = [];
            this.usersReport.push(user);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getStudentUserByCurrentUserTeacherGraph(): void {
        this.services.getStudentUserByIdUser(
            this.userSelectedGraph
        ).subscribe((user) => {
            this.usersGraph = [];
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
                    this.services.getStudentByIdUser(i).subscribe(
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
