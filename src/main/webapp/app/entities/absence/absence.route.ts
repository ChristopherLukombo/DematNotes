import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AbsenceComponent } from './absence.component';
import { AbsenceDetailComponent } from './absence-detail.component';
import { AbsencePopupComponent } from './absence-dialog.component';
import { AbsenceDeletePopupComponent } from './absence-delete-dialog.component';

export const absenceRoute: Routes = [
    {
        path: 'absence',
        component: AbsenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'absence/:id',
        component: AbsenceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const absencePopupRoute: Routes = [
    {
        path: 'absence-new',
        component: AbsencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'absence/:id/edit',
        component: AbsencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'absence/:id/delete',
        component: AbsenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
