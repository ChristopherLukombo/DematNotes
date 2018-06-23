import {Route} from '@angular/router';
import {UserRouteAccessService} from '../shared';
import {SchoolLifeComponent} from './school-life.component';

export const schoolLifeRoute: Route = {
    path: 'schoolLife',
    component: SchoolLifeComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.schoolLife'
    },
    canActivate: [UserRouteAccessService]
};
