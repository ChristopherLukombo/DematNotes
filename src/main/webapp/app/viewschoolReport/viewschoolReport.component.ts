import {Component, OnInit} from '@angular/core';
import {saveAs} from 'file-saver';
import {School} from '../entities/school/index';
import {MatDialog} from '@angular/material';
import {Principal} from '../shared/index';
import {Classroom} from '../entities/classroom/index';
import {Results} from '../results/results.model';
import {Services} from '../services';
import {User} from '../shared/user/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-view-school-report',
    templateUrl: './viewschoolReport.component.html'
})
export class ViewschoolReportComponent implements OnInit {
    schools: School[] = [];
    classrooms: Classroom[] = [];
    users: User[] = [];
    results: Results = new Results();
    resultsStudent: Results = new Results();

    userIndexSelected;

    imgAvatar = require('../../content/images/avatar.png');
    idUser: number;

    constructor(
        private principal: Principal,
        private services: Services,
        public dialog: MatDialog,
        public activatedRoute: ActivatedRoute
    ) {
        this.idUser = activatedRoute.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getResults();
    }

    public getResults(): void {
        this.services.getResultsByStudent(this.idUser)
            .subscribe((results) => {
                this.resultsStudent = results;
            }, (error) => {
                console.error(JSON.parse(error).message);
            });
    }
}
