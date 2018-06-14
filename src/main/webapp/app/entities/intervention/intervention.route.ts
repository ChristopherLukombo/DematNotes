import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InterventionComponent } from './intervention.component';
import { InterventionDetailComponent } from './intervention-detail.component';
import { InterventionPopupComponent } from './intervention-dialog.component';
import { InterventionDeletePopupComponent } from './intervention-delete-dialog.component';

export const interventionRoute: Routes = [
    {
        path: 'intervention',
        component: InterventionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervention/:id',
        component: InterventionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interventionPopupRoute: Routes = [
    {
        path: 'intervention-new',
        component: InterventionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervention/:id/edit',
        component: InterventionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervention/:id/delete',
        component: InterventionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
