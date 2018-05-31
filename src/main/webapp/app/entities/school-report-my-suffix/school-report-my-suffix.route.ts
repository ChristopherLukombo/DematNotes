import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SchoolReportMySuffixComponent } from './school-report-my-suffix.component';
import { SchoolReportMySuffixDetailComponent } from './school-report-my-suffix-detail.component';
import { SchoolReportMySuffixPopupComponent } from './school-report-my-suffix-dialog.component';
import { SchoolReportMySuffixDeletePopupComponent } from './school-report-my-suffix-delete-dialog.component';

export const schoolReportRoute: Routes = [
    {
        path: 'school-report-my-suffix',
        component: SchoolReportMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-report-my-suffix/:id',
        component: SchoolReportMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolReportPopupRoute: Routes = [
    {
        path: 'school-report-my-suffix-new',
        component: SchoolReportMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-report-my-suffix/:id/edit',
        component: SchoolReportMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-report-my-suffix/:id/delete',
        component: SchoolReportMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
