import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DelayStudentMySuffixComponent } from './delay-student-my-suffix.component';
import { DelayStudentMySuffixDetailComponent } from './delay-student-my-suffix-detail.component';
import { DelayStudentMySuffixPopupComponent } from './delay-student-my-suffix-dialog.component';
import { DelayStudentMySuffixDeletePopupComponent } from './delay-student-my-suffix-delete-dialog.component';

export const delayStudentRoute: Routes = [
    {
        path: 'delay-student-my-suffix',
        component: DelayStudentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'delay-student-my-suffix/:id',
        component: DelayStudentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const delayStudentPopupRoute: Routes = [
    {
        path: 'delay-student-my-suffix-new',
        component: DelayStudentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delay-student-my-suffix/:id/edit',
        component: DelayStudentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'delay-student-my-suffix/:id/delete',
        component: DelayStudentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.delayStudent.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
