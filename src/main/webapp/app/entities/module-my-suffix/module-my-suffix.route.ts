import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ModuleMySuffixComponent } from './module-my-suffix.component';
import { ModuleMySuffixDetailComponent } from './module-my-suffix-detail.component';
import { ModuleMySuffixPopupComponent } from './module-my-suffix-dialog.component';
import { ModuleMySuffixDeletePopupComponent } from './module-my-suffix-delete-dialog.component';

export const moduleRoute: Routes = [
    {
        path: 'module-my-suffix',
        component: ModuleMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.module.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'module-my-suffix/:id',
        component: ModuleMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.module.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modulePopupRoute: Routes = [
    {
        path: 'module-my-suffix-new',
        component: ModuleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.module.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'module-my-suffix/:id/edit',
        component: ModuleMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.module.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'module-my-suffix/:id/delete',
        component: ModuleMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.module.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
