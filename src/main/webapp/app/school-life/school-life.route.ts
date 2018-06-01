import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import {SchoolLifeComponent} from './school-life.component';

export const schoolLifeRoute: Route = {
    path: 'schoolLife',
    component: SchoolLifeComponent,
    data: {
        authorities: ['ROLE_USER'],
        // pageTitle: 'dematNotesApp.marks.home.title'
        pageTitle: 'Vie scolaire'
    },
    canActivate: [UserRouteAccessService]
};
