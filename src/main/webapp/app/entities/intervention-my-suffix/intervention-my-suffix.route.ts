import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InterventionMySuffixComponent } from './intervention-my-suffix.component';
import { InterventionMySuffixDetailComponent } from './intervention-my-suffix-detail.component';
import { InterventionMySuffixPopupComponent } from './intervention-my-suffix-dialog.component';
import { InterventionMySuffixDeletePopupComponent } from './intervention-my-suffix-delete-dialog.component';

export const interventionRoute: Routes = [
    {
        path: 'intervention-my-suffix',
        component: InterventionMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'intervention-my-suffix/:id',
        component: InterventionMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const interventionPopupRoute: Routes = [
    {
        path: 'intervention-my-suffix-new',
        component: InterventionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervention-my-suffix/:id/edit',
        component: InterventionMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'intervention-my-suffix/:id/delete',
        component: InterventionMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.intervention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
