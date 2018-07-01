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

import {Manager} from '../entities/manager';
import {Evaluation} from '../entities/evaluation';
import {SchoolReportList} from './model.schoolReportList';

@Component({
    selector: 'jhi-school-reports',
    templateUrl: './school-reports.component.html'
})
export class SchoolReportsComponent implements OnInit {
    currentUser: User;

    schools: School[] = Array<School>();
    classrooms: Classroom[] = Array<Classroom>();
    users: User[] = Array<User>();

    schoolSelected;
    classroomSelected;
    userSelected;

    imgUpload = require('../../content/images/download.svg');

    schoolReport: SchoolReport = new SchoolReport();

    evaluations: Evaluation[] = [];
    schoolReportList: SchoolReportList = new SchoolReportList();

    manager: Manager;

    stateSaved = 0;

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
        this.principal.identity().then((account) => {
            this.currentUser = account;
        }).then((response) => {
            this.services.getSchoolsByManager(this.currentUser.id)
                .subscribe((schools) => {
                    this.schools = schools;
                }, (error) => {
                    console.error(JSON.parse(error.body).message);
                });
        });
    }

    getClassroomsByCurrentManager(): void {
        this.services.getClassroomsByManager(this.currentUser.id, this.schoolSelected)
            .subscribe((classrooms) => {
                this.classrooms = classrooms;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    getStudentsByManager(): void {
        this.services.getStudentsByManager(this.currentUser.id, this.schoolSelected, this.classroomSelected)
            .subscribe((users) => {
                this.users = users;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    downloadSchoolReport() {
        this.services.downloadSchoolReport(this.currentUser.id)
            .subscribe((response) => {
                saveAs(response, 'bulletin');
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    saveSchoolReport() {
        this.services.findManagerByUser(this.currentUser).subscribe((manager) => {
            this.manager = manager;
        }, (error) => {
            console.error(JSON.parse(error.body).message);
        }, () => {

            this.services.getStudentByIdUser(this.userSelected)
                .subscribe((student) => {
                    this.schoolReport.studentId = student.id;
                    this.schoolReport.managerId = this.manager.id;
                }, (error) => {
                    console.error(JSON.parse(error.body).message);
                }, () => {

                    this.services.saveSchoolReport(this.schoolReport)
                        .subscribe((schoolReport) => {
                            if (schoolReport) {
                                this.stateSaved = 1;
                                this.resetForm();
                                setTimeout(() => {
                                    this.stateSaved = 0;
                                }, 2000);
                            }
                        }, (error) => {
                            console.error(JSON.parse(error.body).message);
                            this.stateSaved = -1;
                            setTimeout(() => {
                                this.stateSaved = 0;
                            }, 2000);
                        });
                });
        });
    }

    getSchoolReportListByStudent() {
        this.services.getSchoolReportListByStudent(this.userSelected)
            .subscribe((schoolReportList) => {
                console.log(schoolReportList);
                this.schoolReportList = schoolReportList;
            }, (error) => {
                console.error(JSON.parse(error.body).message);

            });
    }

    private resetForm() {
        this.schoolSelected = undefined;
        this.classroomSelected = undefined;
    }
}
