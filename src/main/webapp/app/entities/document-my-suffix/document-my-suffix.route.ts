import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentMySuffixComponent } from './document-my-suffix.component';
import { DocumentMySuffixDetailComponent } from './document-my-suffix-detail.component';
import { DocumentMySuffixPopupComponent } from './document-my-suffix-dialog.component';
import { DocumentMySuffixDeletePopupComponent } from './document-my-suffix-delete-dialog.component';

export const documentRoute: Routes = [
    {
        path: 'document-my-suffix',
        component: DocumentMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.document.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-my-suffix/:id',
        component: DocumentMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.document.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: 'document-my-suffix-new',
        component: DocumentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.document.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-my-suffix/:id/edit',
        component: DocumentMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.document.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-my-suffix/:id/delete',
        component: DocumentMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.document.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
