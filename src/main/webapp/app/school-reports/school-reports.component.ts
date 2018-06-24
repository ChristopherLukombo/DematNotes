import {Component, OnInit} from '@angular/core';
import {Principal} from '../shared';
import {User} from '../shared/user/user.model';
import {School} from '../entities/school';
import {Classroom} from '../entities/classroom';
import {MatIconRegistry} from '@angular/material';
import {saveAs} from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';
import {Services} from '../services';
import {SchoolReport} from '../entities/school-report';
import {Evaluation} from '../entities/evaluation';

@Component({
    selector: 'jhi-school-reports',
    templateUrl: './school-reports.component.html'
})
export class SchoolReportsComponent implements OnInit {
    currentUser: any;

    schools: School[] = Array<School>();
    classrooms: Classroom[] = Array<Classroom>();
    users: User[] = Array<User>();

    schoolSelected;
    classroomSelected;
    userSelected;

    imgUpload = require('../../content/images/download.svg');

    schoolReport: SchoolReport = new SchoolReport();

    evaluations: Evaluation[] = [];

    constructor(
        private principal: Principal,
        private services: Services,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
    ) {

        // Loading of encrypted icon
        this.iconRegistry.addSvgIcon(
            'download',
            this.sanitizer.bypassSecurityTrustResourceUrl(this.imgUpload));
    }

    ngOnInit(): void {
        this.loadCurrentUser();
    }

    private loadCurrentUser(): void {
        this.principal.identity().then((account) => {
            this.currentUser = account;
            this.services.getSchoolsByManager(account.id)
                .subscribe(
                    (schools) => {
                        this.schools = schools;
                    }, (error) => {
                        console.log(JSON.parse(error.body).message);
                    });
        });
    }

    getClassroomsByCurrentManager(): void {
        this.services.getClassroomsByManager(this.currentUser.id, this.schoolSelected)
            .subscribe(
                (classrooms) => {
                    this.userSelected = undefined;
                    this.classroomSelected = undefined;
                    this.classrooms = classrooms;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    getStudentsByManager(): void {
        this.services.getStudentsByManager(this.currentUser.id, this.schoolSelected, this.classroomSelected)
            .subscribe(
                (users) => {
                    this.users = users;
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    getStudentByManager(): void {
        this.services.getStudentByManager(this.userSelected)
            .subscribe(
                (users) => {
                    this.users = [];
                    this.users.push(users);
                    this.getEvaluationsByStudent(users.id);
                }, (error) => {
                    console.log(JSON.parse(error.body).message);
                });
    }

    downloadSchoolReport() {
        this.services.downloadSchoolReport(this.currentUser.id)
            .subscribe((response) => {
                saveAs(response, 'bulletin');
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    saveSchoolReport() {
        this.services.findManagerByUser(this.currentUser)
            .subscribe((manager) => {
                this.services.getStudentByIdUser(this.userSelected)
                    .subscribe((student) => {
                        this.schoolReport.studentId = student.id;
                        this.schoolReport.managerId = manager.id;
                        this.services.saveSchoolReport(this.schoolReport)
                            .subscribe((schoolReport) => {
                                if (schoolReport) {
                                    alert('Bulletin créé');
                                }
                            }, (error) => {
                                console.log(JSON.parse(error.body).message);
                            });
                    }, (error1) => {
                        console.log(JSON.parse(error1.body).message);
                    });

            }, (error2) => {
                console.log(JSON.parse(error2.body).message);
            });
    }

    getEvaluationsByStudent(accountCode) {
        this.services.getEvaluationsByStudent(accountCode)
            .subscribe((evaluations) => {
                this.evaluations = evaluations;
                console.log(evaluations);
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }
}
