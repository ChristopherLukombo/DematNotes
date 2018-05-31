import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AbsenceMySuffixComponent } from './absence-my-suffix.component';
import { AbsenceMySuffixDetailComponent } from './absence-my-suffix-detail.component';
import { AbsenceMySuffixPopupComponent } from './absence-my-suffix-dialog.component';
import { AbsenceMySuffixDeletePopupComponent } from './absence-my-suffix-delete-dialog.component';

export const absenceRoute: Routes = [
    {
        path: 'absence-my-suffix',
        component: AbsenceMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'absence-my-suffix/:id',
        component: AbsenceMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const absencePopupRoute: Routes = [
    {
        path: 'absence-my-suffix-new',
        component: AbsenceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'absence-my-suffix/:id/edit',
        component: AbsenceMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'absence-my-suffix/:id/delete',
        component: AbsenceMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.absence.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
