import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Results} from '../results/results.model';
import {Services} from '../services';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'jhi-view-school-report',
    templateUrl: './viewschoolReport.component.html'
})
export class ViewschoolReportComponent implements OnInit {
    resultsStudent: Results = new Results();

    userIndexSelected;

    idUser: number;

    constructor(
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
