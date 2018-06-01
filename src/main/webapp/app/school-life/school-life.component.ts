import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'jhi-school-life',
    templateUrl: './school-life.component.html'
})
export class SchoolLifeComponent implements OnInit {
    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    ngOnInit(): void {
    }

}
