import {Component, OnInit} from '@angular/core';
import {SchoolReportService} from './school-reports.service';
@Component({
    selector: 'jhi-school-reports',
    templateUrl: './school-reports.component.html'
})
export class SchoolReportsComponent implements OnInit {
    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    constructor(private schoolReportService: SchoolReportService) {}

    ngOnInit(): void {
    }

    downloadPDF() {
        this.schoolReportService.query().subscribe((response) => {
            console.log(response.body);
        });
    }
}
