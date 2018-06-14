import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SchoolYearComponent } from './school-year.component';
import { SchoolYearDetailComponent } from './school-year-detail.component';
import { SchoolYearPopupComponent } from './school-year-dialog.component';
import { SchoolYearDeletePopupComponent } from './school-year-delete-dialog.component';

export const schoolYearRoute: Routes = [
    {
        path: 'school-year',
        component: SchoolYearComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-year/:id',
        component: SchoolYearDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolYearPopupRoute: Routes = [
    {
        path: 'school-year-new',
        component: SchoolYearPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-year/:id/edit',
        component: SchoolYearPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-year/:id/delete',
        component: SchoolYearDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolYear.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
