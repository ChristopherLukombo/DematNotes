import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StudentMySuffixComponent } from './student-my-suffix.component';
import { StudentMySuffixDetailComponent } from './student-my-suffix-detail.component';
import { StudentMySuffixPopupComponent } from './student-my-suffix-dialog.component';
import { StudentMySuffixDeletePopupComponent } from './student-my-suffix-delete-dialog.component';

export const studentRoute: Routes = [
    {
        path: 'student-my-suffix',
        component: StudentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'student-my-suffix/:id',
        component: StudentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.student.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const studentPopupRoute: Routes = [
    {
        path: 'student-my-suffix-new',
        component: StudentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-my-suffix/:id/edit',
        component: StudentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'student-my-suffix/:id/delete',
        component: StudentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.student.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
