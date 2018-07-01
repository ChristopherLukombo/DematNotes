import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {Services} from '../services';
import {Evaluation} from '../entities/evaluation';
import {MarksList} from './marksList.model';
import {StudentsList} from './studentsList.model';
import {ModulesList} from './modulesList.model';

@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html'
})
export class MarksComponent implements OnInit {
    currentUser: User = new User();
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

    averages: string[] = Array<string>(this.users.length);
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
    containsData = false;

    modulesList: ModulesList = new ModulesList();

    idModule;
    idStudent;

    evaluations: Evaluation[] = [];

    evals: Evaluation[] = Array<Evaluation>(this.users.length);

    studentsList: StudentsList = new StudentsList();
    statusMessage = '';

    constructor(
        private principal: Principal,
        private services: Services,
    ) {
    }

    ngOnInit(): void {
        this.onLoadCurrentUser();
        this.onLoadCurrentUserReport();
        this.onLoadCurrentUserGraph();
    }

    onChartClick(event): void {
        console.log(event);
    }

    private onLoadCurrentUser(): void {
        this.principal.identity()
            .then((account) => {
                this.currentUser = account;
                this.services.getSchools(account.id).subscribe((schools) => {
                    this.schools = schools;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
            });
    }

    private onLoadCurrentUserReport(): void {
        this.principal.identity().then((account) => {
            this.currentUserReport = account;
            this.services.getSchools(
                account.id
            ).subscribe(
                (schools) => {
                    this.schoolsReport = schools;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
        });
    }

    private onLoadCurrentUserGraph(): void {
        this.principal.identity().then((account) => {
            this.currentUserGraph = account;
            this.services.getSchools(
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
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            }
        );
    }

    getClassroomsByCurrentUserTeacher(): void {
        this.services.getClassrooms(
            this.currentUser.id,
            this.schoolSelected
        ).subscribe((classrooms) => {
            this.userSelected = undefined;
            this.classroomSelected = undefined;
            this.classrooms = classrooms;
            console.log(this.users);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    getClassroomsByCurrentUserTeacherReport(): void {
        this.services.getClassrooms(
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
        this.services.getClassrooms(
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
        this.services.getModules(this.currentUser.id, this.schoolSelected, this.classroomSelected)
            .then((modulesList) => {
                this.modulesList = modulesList;
            }).catch((error) => {
            console.error(JSON.parse(error.body).message);
        });

        this.services.getStudentsByTeacher(
            this.currentUser.id,
            this.schoolSelected,
            this.classroomSelected)
            .then((studentsList) => {
                if (studentsList == null) {
                    this.statusMessage = 'Students are not presents';
                } else {
                    this.studentsList = studentsList;
                }
            }).catch((error) => {
            this.statusMessage = 'Problem with the service, Please try after sometime';
            console.error(JSON.parse(error.body).message);
        });
    }

    getStudentsUserByCurrentUserTeacherReport(): void {
        this.services.getStudents(
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
        this.services.getStudents(
            this.currentUserGraph.id,
            this.schoolSelectedGraph,
            this.classroomSelectedGraph
        ).subscribe((users) => {
            this.usersGraph = users;
            this.loadChartData();
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

            this.services.getStudentByIdUser(user.id)
                .subscribe((student) => {
                    this.idStudent = student.id;
                }, (error) => {
                    console.error(JSON.parse(error.body).message);
                }).unsubscribe();

            this.getEvaluations(this.userSelectedReport);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });
    }

    /**
     * Save marks
     */
    saveMarks(): void {
        let i = 0;
        let isFinished = false;

        while (i < this.studentsList.users.length && !isFinished) {
            const evaluation = new Evaluation();
            evaluation.average = parseFloat(this.averages[i]);
            evaluation.comment = this.comments[i];
            evaluation.moduleId = this.idModule;
            evaluation.coefficient = this.modulesList.coefficients[0];
            evaluation.average = parseFloat(this.averages[i]);
            evaluation.studentId = this.idStudent;
            evaluation.teacherId = null;

            this.evals.push(evaluation);
            console.log(evaluation);

            if (this.studentsList.users.length - 1 === i) {
                isFinished = true;
            }
            i++;
        }

        if (isFinished) {
            const m = new MarksList();
            m.evaluations = this.evals;
            this.services.saveEvaluations(m)
                .subscribe((response) => {
                    if (response) {
                        this.evals = [];
                    }
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                    this.evals = [];
                });
        }
    }

    getEvaluations(accountCode): void {
        this.services.getEvaluationsByStudent(accountCode)
            .subscribe((evaluations) => {
                console.log('getEvaluations' + accountCode , this.evaluations , evaluations);
                this.evaluations = evaluations;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

}
