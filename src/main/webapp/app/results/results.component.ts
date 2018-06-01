import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jhi-results',
    templateUrl: './results.component.html'
})
export class ResultsComponent implements OnInit {
    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    ngOnInit(): void {
    }

}
