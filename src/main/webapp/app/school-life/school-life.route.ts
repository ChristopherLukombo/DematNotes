import {Route} from '@angular/router';
import {UserRouteAccessService} from '../shared';
import {SchoolLifeComponent} from './school-life.component';

export const schoolLifeRoute: Route = {
    path: 'schoolLife',
    component: SchoolLifeComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT'],
        pageTitle: 'global.menu.schoolLife'
    },
    canActivate: [UserRouteAccessService]
};
