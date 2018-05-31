import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InscriptionModuleMySuffixComponent } from './inscription-module-my-suffix.component';
import { InscriptionModuleMySuffixDetailComponent } from './inscription-module-my-suffix-detail.component';
import { InscriptionModuleMySuffixPopupComponent } from './inscription-module-my-suffix-dialog.component';
import { InscriptionModuleMySuffixDeletePopupComponent } from './inscription-module-my-suffix-delete-dialog.component';

export const inscriptionModuleRoute: Routes = [
    {
        path: 'inscription-module-my-suffix',
        component: InscriptionModuleMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscriptionModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'inscription-module-my-suffix/:id',
        component: InscriptionModuleMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscriptionModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inscriptionModulePopupRoute: Routes = [
    {
        path: 'inscription-module-my-suffix-new',
        component: InscriptionModuleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscriptionModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscription-module-my-suffix/:id/edit',
        component: InscriptionModuleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscriptionModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'inscription-module-my-suffix/:id/delete',
        component: InscriptionModuleMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.inscriptionModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
