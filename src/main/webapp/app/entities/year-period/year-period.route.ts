import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { YearPeriodComponent } from './year-period.component';
import { YearPeriodDetailComponent } from './year-period-detail.component';
import { YearPeriodPopupComponent } from './year-period-dialog.component';
import { YearPeriodDeletePopupComponent } from './year-period-delete-dialog.component';

export const yearPeriodRoute: Routes = [
    {
        path: 'year-period',
        component: YearPeriodComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.yearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'year-period/:id',
        component: YearPeriodDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.yearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const yearPeriodPopupRoute: Routes = [
    {
        path: 'year-period-new',
        component: YearPeriodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.yearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'year-period/:id/edit',
        component: YearPeriodPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.yearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'year-period/:id/delete',
        component: YearPeriodDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.yearPeriod.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
