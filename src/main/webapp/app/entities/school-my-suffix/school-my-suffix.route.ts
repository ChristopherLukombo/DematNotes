import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SchoolMySuffixComponent } from './school-my-suffix.component';
import { SchoolMySuffixDetailComponent } from './school-my-suffix-detail.component';
import { SchoolMySuffixPopupComponent } from './school-my-suffix-dialog.component';
import { SchoolMySuffixDeletePopupComponent } from './school-my-suffix-delete-dialog.component';

export const schoolRoute: Routes = [
    {
        path: 'school-my-suffix',
        component: SchoolMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-my-suffix/:id',
        component: SchoolMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.school.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolPopupRoute: Routes = [
    {
        path: 'school-my-suffix-new',
        component: SchoolMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-my-suffix/:id/edit',
        component: SchoolMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-my-suffix/:id/delete',
        component: SchoolMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.school.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
