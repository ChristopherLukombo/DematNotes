import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ManagerMySuffixComponent } from './manager-my-suffix.component';
import { ManagerMySuffixDetailComponent } from './manager-my-suffix-detail.component';
import { ManagerMySuffixPopupComponent } from './manager-my-suffix-dialog.component';
import { ManagerMySuffixDeletePopupComponent } from './manager-my-suffix-delete-dialog.component';

export const managerRoute: Routes = [
    {
        path: 'manager-my-suffix',
        component: ManagerMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'manager-my-suffix/:id',
        component: ManagerMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const managerPopupRoute: Routes = [
    {
        path: 'manager-my-suffix-new',
        component: ManagerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manager-my-suffix/:id/edit',
        component: ManagerMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'manager-my-suffix/:id/delete',
        component: ManagerMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.manager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
