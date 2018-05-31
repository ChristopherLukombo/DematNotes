import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClassroomMySuffixComponent } from './classroom-my-suffix.component';
import { ClassroomMySuffixDetailComponent } from './classroom-my-suffix-detail.component';
import { ClassroomMySuffixPopupComponent } from './classroom-my-suffix-dialog.component';
import { ClassroomMySuffixDeletePopupComponent } from './classroom-my-suffix-delete-dialog.component';

export const classroomRoute: Routes = [
    {
        path: 'classroom-my-suffix',
        component: ClassroomMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'classroom-my-suffix/:id',
        component: ClassroomMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const classroomPopupRoute: Routes = [
    {
        path: 'classroom-my-suffix-new',
        component: ClassroomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classroom-my-suffix/:id/edit',
        component: ClassroomMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'classroom-my-suffix/:id/delete',
        component: ClassroomMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.classroom.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
