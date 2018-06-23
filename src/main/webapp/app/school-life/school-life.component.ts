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
import {AbsenceSearch} from './absenceSearch';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'jhi-school-life',
    templateUrl: './school-life.component.html'
})
export class SchoolLifeComponent implements OnInit {
    currentUser: User = new User();

    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];
    modules: Module[] = [];

    schoolSelected;
    classroomSelected;
    userSelected;
    moduleSelected;

    absences: Absence[] = [];
    delayStudents: DelayStudent[] = [];

    imgUpload = require('../../content/images/upload.svg');

    absencesSelected: number[] = Array<number>(this.users.length);
    absenceSearch: AbsenceSearch = new AbsenceSearch();

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
        this.loadCurrentUser();
    }

    /**
     * Load Current User logged in
     */
    private loadCurrentUser(): void {
        this.principal.identity().then((currentUser) => {
            this.currentUser = currentUser;
            // As soon as we know current User
            // We loaded All
            this.getSchools(currentUser);
            this.getAbsences(currentUser);
            this.getDelayStudents(currentUser);
        });
    }

    // Part Teacher

    private getSchools(account): void {
        this.services.getSchools(account.id)
            .subscribe((schools) => {
                this.schools = schools;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    public getClassrooms(): void {
        this.services.getClassrooms(this.currentUser.id, this.schoolSelected)
            .subscribe((classrooms) => {
                this.userSelected = undefined;
                this.classroomSelected = undefined;
                this.classrooms = classrooms;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    private getModules(): void {
        this.services.getModulesByTeacherAndClassroom(this.currentUser.id, this.classroomSelected)
            .subscribe((modules) => {
                this.modules = modules;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    public getStudents(): void {
        this.services.getStudents(this.currentUser.id, this.schoolSelected, this.classroomSelected)
            .subscribe((users) => {
                this.users = users;
                this.getModules();
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    // Part Student

    private getAbsences(account): void {
        this.services.getAbsences(account.id)
            .subscribe((absences) => {
                this.absences = absences;
            }, (error) => {
                console.log(JSON.parse(error.body).message);
            });
    }

    private getDelayStudents(account): void {
        this.services.getDelayStudents(account.id)
            .subscribe((delayStudents) => {
                this.delayStudents = delayStudents;
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

    public saveAbsences(): void {
        const accountsCode = this.getAccountsCode();

        this.absenceSearch.moduleId = this.moduleSelected;
        this.absenceSearch.accountsCode = accountsCode;

        this.services.saveAbsencesModules(this.absenceSearch).subscribe((response) => {
            console.log('ok ' + response);
        }, (error) => {
            console.log(JSON.parse(error.body).message);
        });

    }

    private getAccountsCode() {
        const accountsCode = [];

        for (let i = 0; i < this.absencesSelected.length; i++) {
            if (this.absencesSelected[i] !== undefined) {
                if (!accountsCode.includes(i)) {
                    accountsCode.push(i);
                }
            }
        }
        return accountsCode;
    }
}
