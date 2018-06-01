import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import {ResultsComponent} from './results.component';

export const resultsRoute: Route = {
    path: 'results',
    component: ResultsComponent,
    data: {
        authorities: ['ROLE_USER'],
        // pageTitle: 'dematNotesApp.marks.home.title'
        pageTitle: 'Résultats'
    },
    canActivate: [UserRouteAccessService]
};
