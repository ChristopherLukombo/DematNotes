import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {Services} from '../services';
import {Evaluation} from './evaluation_.model';
import {MarksList} from './marksList.model';
import {StudentsList} from './studentsList.model';
import {ModulesList} from './modulesList.model';
import {Module} from '../entities/module';
import {Teacher} from '../entities/teacher';
import {ChartData} from './chartData.model';

@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html'
})
export class MarksComponent implements OnInit {
    currentUser: User = new User();
    currentUserGraph: any;

    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];

    schoolsGraph: School[] = [];
    classroomsGraph: Classroom[] = [];
    usersGraph: User[] = [];

    schoolSelected;
    classroomSelected;
    userSelected;

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

    evaluations: Evaluation[] = [];

    evals: Evaluation[] = Array<Evaluation>(this.users.length);

    studentsList: StudentsList = new StudentsList();

    imgAvatar = require('../../content/images/avatar.png');

    stateSaved = 0;

    evaluationDate: any;

    teacher: Teacher;

    constructor(
        private principal: Principal,
        private services: Services,
    ) {
    }

    ngOnInit(): void {
        this.principal.identity()
            .then((account) => {
                this.currentUser = account;
            }).then((response) => {
            this.services.getSchools(this.currentUser.id)
                .subscribe((schools) => {
                    this.schools = schools;
                }, (error) => {
                    console.error(JSON.parse(error.body).message);
                });
            this.onLoadTeacher();
        });
        this.onLoadCurrentUserGraph();
    }

    onChartClick(event): void {
        console.log(event);
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
                    console.error(JSON.parse(error.body).message);
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
                console.error(JSON.parse(error.body).message);
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
            console.error(JSON.parse(error.body).message);
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
            console.error(JSON.parse(error.body).message);
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
                this.studentsList = studentsList;
            }).catch((error) => {
            console.error(JSON.parse(error.body).message);
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

            const m = new Module();
            m.id = this.idModule;
            evaluation.module = m;
            evaluation.coefficient = this.modulesList.coefficients[0];
            evaluation.average = parseFloat(this.averages[i]);

            const s = this.studentsList.students[i];
            evaluation.student = s;

            evaluation.evaluationDate = this.evaluationDate;

            evaluation.teacher = this.teacher;

            this.evals.push(evaluation);

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
                        this.stateSaved = 1;
                        this.resetForm();
                        setTimeout(() => {
                            this.stateSaved = 0;
                        }, 2000);
                    }
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                    this.evals = [];
                    this.stateSaved = -1;
                    this.resetForm();
                    setTimeout(() => {
                        this.stateSaved = 0;
                    }, 2000);
                });
        }
    }

    getEvaluations(accountCode): void {
        this.services.getEvaluationsByStudent(accountCode)
            .subscribe((evaluations) => {
                this.evaluations = evaluations;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    private resetForm() {
        this.idModule = undefined;
        this.classroomSelected = undefined;
        this.schoolSelected = undefined;
        this.averages = Array<string>(this.users.length);
        this.comments = Array<string>(this.users.length);
        this.evaluationDate = undefined;
    }

    onLoadTeacher(): void {
        this.services.getTeacherByIdUser(this.currentUser.id)
            .subscribe((teacher) => {
                this.teacher = teacher;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }
}
