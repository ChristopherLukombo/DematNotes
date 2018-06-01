import {Component, OnInit} from '@angular/core';
import { Account, LoginModalService, Principal } from '../shared';
import {MarksService} from './marks.service';
import {User} from '../shared/user/user.model';
@Component({
    selector: 'jhi-marks',
    templateUrl: './marks.component.html'
})
export class MarksComponent implements OnInit {
    foods = [
        {value: 'steak-0', viewValue: 'Steak'},
        {value: 'pizza-1', viewValue: 'Pizza'},
        {value: 'tacos-2', viewValue: 'Tacos'}
    ];

    id: number;
    firstName: string;
    lastName: string;
    mark: any;

    displayedColumns = ['id', 'firstName', 'lastName', 'mark'];
    dataSource = ELEMENT_DATA;

    chartOptions = {
        responsive: true
    };

    users = new Array<User>();

    chartData = [
        { data: [330, 600, 260, 700], label: 'Account A' },
        { data: [120, 455, 100, 340], label: 'Account B' },
        { data: [45, 67, 800, 500], label: 'Account C' }
    ];

    chartLabels = ['January', 'February', 'Mars', 'April'];

    constructor(private principal: Principal,
                private marksService: MarksService
    ) {

    }

    onChartClick(event) {
        console.log(event);
    }

    ngOnInit(): void {
        this.marksService.getUser().subscribe((users) => {
                this.users = users;
        });
    }

}

export interface Element {
    id: number;
    firstName: string;
    lastName: string;
    mark: any;
}

const ELEMENT_DATA: Element[] = [
    {id: 1, firstName: 'Hydrogen', lastName: 'H', mark: ''},
    {id: 2, firstName: 'Helium', lastName: 'He', mark: ''},
    {id: 3, firstName: 'Lithium', lastName: 'Li', mark: ''},
    {id: 4, firstName: 'Beryllium', lastName: 'Be', mark: ''},
    {id: 5, firstName: 'Boron', lastName: 'B', mark: ''},
    {id: 6, firstName: 'Carbon', lastName: 'C', mark: ''},
];
