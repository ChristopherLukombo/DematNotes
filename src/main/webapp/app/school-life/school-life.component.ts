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
import {Module} from '../entities/module';
import {AbsenceSearch} from './model.absenceSearch';
import {DelayStudentSearch} from './model.delaySearch';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

@Component({
    selector: 'jhi-school-life',
    templateUrl: './school-life.component.html'
})
export class SchoolLifeComponent implements OnInit {
    currentUser: any;

    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];
    modules: Module[] = [];

    schoolSelected;
    classroomSelected;
    moduleSelected;

    absences: Absence[] = [];
    delayStudents: DelayStudent[] = [];

    imgUpload = require('../../content/images/upload.svg');
    imgAvatar = require('../../content/images/avatar.png');

    absencesSelected: boolean[] = Array<boolean>(this.users.length);
    delaysSelected: boolean[] = Array<boolean>(this.users.length);
    absenceSearch: AbsenceSearch = new AbsenceSearch();
    delaySearch: DelayStudentSearch = new DelayStudentSearch();

    startDate: any;
    endDate: any;

    stateSaved = 0;

    constructor(
        private principal: Principal,
        private services: Services,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        public dialog: MatDialog,
    ) {
        this.iconRegistry.addSvgIcon(
            'upload',
            this.sanitizer
                .bypassSecurityTrustResourceUrl(this.imgUpload)
        );
    }

    ngOnInit(): void {
        this.principal.identity().then((currentUser) => {
            this.currentUser = currentUser;
        }).then((response) => {
            // As soon as we know current User
            // We loaded All
            this.getSchools(this.currentUser);
            this.getAbsences(this.currentUser);
            this.getDelayStudents(this.currentUser);
        });
    }

    // Part Teacher

    private getSchools(account): void {
        this.services.getSchools(account.id)
            .subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    public getClassrooms(): void {
        this.services.getClassrooms(this.currentUser.id, this.schoolSelected)
            .subscribe((classrooms) => {
                this.classrooms = classrooms;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    public getStudents(): void {
        this.services.getStudents(this.currentUser.id, this.schoolSelected, this.classroomSelected)
            .subscribe((users) => {
                this.users = users;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            }, () => {
                this.getModules();
            });
    }

    private getModules(): void {
        this.services.getModulesByTeacherAndClassroom(this.currentUser.id, this.classroomSelected)
            .subscribe((modules) => {
                this.modules = modules;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    // Part Student

    private getAbsences(account): void {
        this.services.getAbsences(account.id)
            .subscribe((absences) => {
                this.absences = absences;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
            });
    }

    private getDelayStudents(account): void {
        this.services.getDelayStudents(account.id)
            .subscribe((delayStudents) => {
                this.delayStudents = delayStudents;
            }, (error) => {
                console.error(JSON.parse(error.body).message);
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
            console.log(response);
        });
    }

    public savePresences(): void {
        this.absenceSearch.startDate = this.startDate;
        this.absenceSearch.endDate = this.endDate;
        this.absenceSearch.moduleId = this.moduleSelected;
        this.absenceSearch.accountsCode = this.getAccountsCodeFromAbsencesSelected();

        this.delaySearch.startDate = this.startDate;
        this.delaySearch.endDate = this.endDate;
        this.delaySearch.moduleId = this.moduleSelected;
        this.delaySearch.accountsCode = this.getAccountsCodeFromDelaysSelected();

        Observable.forkJoin(
            [
                this.services.saveAbsencesModules(this.absenceSearch),
                this.services.saveDelaysStudents(this.delaySearch)
            ])
            .subscribe((response) => {
                console.log(response);
            }, (error) => {
                console.error(JSON.parse(error.body).message);
                this.stateSaved = -1;
                setTimeout(() => {
                    this.stateSaved = 0;
                }, 2000);
            }, () => {
                this.stateSaved = 1;
                this.resetForm();
                setTimeout(() => {
                    this.stateSaved = 0;
                }, 2000);
            });
    }

    private resetForm() {
        this.absenceSearch = new AbsenceSearch();
        this.absencesSelected = Array<boolean>(this.users.length);
        this.delaysSelected = Array<boolean>(this.users.length);
        this.startDate = undefined;
        this.endDate = undefined;
        this.schoolSelected = undefined;
        this.classroomSelected = undefined;
        this.moduleSelected = undefined;
    }

    private getAccountsCodeFromAbsencesSelected() {
        const accountsCode = [];

        for (let i = 0; i < this.absencesSelected.length; i++) {
            if (this.absencesSelected[i] !== undefined && this.absencesSelected[i] !== false) {
                if (!accountsCode.includes(i)) {
                    accountsCode.push(i);
                }
            }
        }
        return accountsCode;
    }

    private getAccountsCodeFromDelaysSelected() {
        const accountsCode = [];

        for (let i = 0; i < this.delaysSelected.length; i++) {
            if (this.delaysSelected[i] !== undefined && this.delaysSelected[i] !== false) {
                console.log(this.delaysSelected[i]);
                if (!accountsCode.includes(i)) {
                    accountsCode.push(i);
                }
            }
        }
        return accountsCode;
    }
}
