import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import {ResultsComponent} from './results.component';

export const resultsRoute: Route = {
    path: 'results',
    component: ResultsComponent,
    data: {
        authorities: ['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.results'
    },
    canActivate: [UserRouteAccessService]
};
