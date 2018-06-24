import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssignmentManagerComponent } from './assignment-manager.component';
import { AssignmentManagerDetailComponent } from './assignment-manager-detail.component';
import { AssignmentManagerPopupComponent } from './assignment-manager-dialog.component';
import { AssignmentManagerDeletePopupComponent } from './assignment-manager-delete-dialog.component';

export const assignmentManagerRoute: Routes = [
    {
        path: 'assignment-manager',
        component: AssignmentManagerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentManager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assignment-manager/:id',
        component: AssignmentManagerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentManager.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assignmentManagerPopupRoute: Routes = [
    {
        path: 'assignment-manager-new',
        component: AssignmentManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentManager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assignment-manager/:id/edit',
        component: AssignmentManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentManager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assignment-manager/:id/delete',
        component: AssignmentManagerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentManager.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
