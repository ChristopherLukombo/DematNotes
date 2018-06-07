import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import {SchoolReportsComponent} from './school-reports.component';

export const schoolReportsRoute: Route = {
    path: 'schoolReports',
    component: SchoolReportsComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.schoolReports'
    },
    canActivate: [UserRouteAccessService]
};
