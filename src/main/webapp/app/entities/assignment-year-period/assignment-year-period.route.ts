import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssignmentYearPeriodComponent } from './assignment-year-period.component';
import { AssignmentYearPeriodDetailComponent } from './assignment-year-period-detail.component';
import { AssignmentYearPeriodPopupComponent } from './assignment-year-period-dialog.component';
import { AssignmentYearPeriodDeletePopupComponent } from './assignment-year-period-delete-dialog.component';

export const assignmentYearPeriodRoute: Routes = [
    {
        path: 'assignment-year-period',
        component: AssignmentYearPeriodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentYearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assignment-year-period/:id',
        component: AssignmentYearPeriodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentYearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assignmentYearPeriodPopupRoute: Routes = [
    {
        path: 'assignment-year-period-new',
        component: AssignmentYearPeriodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentYearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assignment-year-period/:id/edit',
        component: AssignmentYearPeriodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentYearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assignment-year-period/:id/delete',
        component: AssignmentYearPeriodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentYearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
