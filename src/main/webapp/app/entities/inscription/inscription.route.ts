import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InscriptionComponent } from './inscription.component';
import { InscriptionDetailComponent } from './inscription-detail.component';
import { InscriptionPopupComponent } from './inscription-dialog.component';
import { InscriptionDeletePopupComponent } from './inscription-delete-dialog.component';

export const inscriptionRoute: Routes = [
    {
        path: 'inscription',
        component: InscriptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inscription/:id',
        component: InscriptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inscriptionPopupRoute: Routes = [
    {
        path: 'inscription-new',
        component: InscriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscription/:id/edit',
        component: InscriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscription/:id/delete',
        component: InscriptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
