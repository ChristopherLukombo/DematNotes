import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SchoolYearMySuffixComponent } from './school-year-my-suffix.component';
import { SchoolYearMySuffixDetailComponent } from './school-year-my-suffix-detail.component';
import { SchoolYearMySuffixPopupComponent } from './school-year-my-suffix-dialog.component';
import { SchoolYearMySuffixDeletePopupComponent } from './school-year-my-suffix-delete-dialog.component';

export const schoolYearRoute: Routes = [
    {
        path: 'school-year-my-suffix',
        component: SchoolYearMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-year-my-suffix/:id',
        component: SchoolYearMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolYearPopupRoute: Routes = [
    {
        path: 'school-year-my-suffix-new',
        component: SchoolYearMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-year-my-suffix/:id/edit',
        component: SchoolYearMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-year-my-suffix/:id/delete',
        component: SchoolYearMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
