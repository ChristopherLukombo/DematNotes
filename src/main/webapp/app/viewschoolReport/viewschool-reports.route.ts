import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import {ViewschoolReportComponent} from './viewschoolReport.component';

export const  viewschoolReportRoute: Route = {
    path: 'viewschoolReport/:id',
    component: ViewschoolReportComponent,
    data: {
        authorities: ['ROLE_STUDENT', 'ROLE_MANAGER', 'ROLE_TEACHER', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.schoolReports'
    },
    canActivate: [UserRouteAccessService]
};
