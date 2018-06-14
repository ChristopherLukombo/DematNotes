import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DelayStudentComponent } from './delay-student.component';
import { DelayStudentDetailComponent } from './delay-student-detail.component';
import { DelayStudentPopupComponent } from './delay-student-dialog.component';
import { DelayStudentDeletePopupComponent } from './delay-student-delete-dialog.component';

export const delayStudentRoute: Routes = [
    {
        path: 'delay-student',
        component: DelayStudentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'delay-student/:id',
        component: DelayStudentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const delayStudentPopupRoute: Routes = [
    {
        path: 'delay-student-new',
        component: DelayStudentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delay-student/:id/edit',
        component: DelayStudentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delay-student/:id/delete',
        component: DelayStudentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
