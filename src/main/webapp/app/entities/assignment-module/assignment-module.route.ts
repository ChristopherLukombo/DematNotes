import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AssignmentModuleComponent } from './assignment-module.component';
import { AssignmentModuleDetailComponent } from './assignment-module-detail.component';
import { AssignmentModulePopupComponent } from './assignment-module-dialog.component';
import { AssignmentModuleDeletePopupComponent } from './assignment-module-delete-dialog.component';

export const assignmentModuleRoute: Routes = [
    {
        path: 'assignment-module',
        component: AssignmentModuleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assignment-module/:id',
        component: AssignmentModuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assignmentModulePopupRoute: Routes = [
    {
        path: 'assignment-module-new',
        component: AssignmentModulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assignment-module/:id/edit',
        component: AssignmentModulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assignment-module/:id/delete',
        component: AssignmentModuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.assignmentModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
