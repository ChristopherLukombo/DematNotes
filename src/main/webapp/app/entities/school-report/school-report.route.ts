import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SchoolReportComponent } from './school-report.component';
import { SchoolReportDetailComponent } from './school-report-detail.component';
import { SchoolReportPopupComponent } from './school-report-dialog.component';
import { SchoolReportDeletePopupComponent } from './school-report-delete-dialog.component';

export const schoolReportRoute: Routes = [
    {
        path: 'school-report',
        component: SchoolReportComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'school-report/:id',
        component: SchoolReportDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schoolReportPopupRoute: Routes = [
    {
        path: 'school-report-new',
        component: SchoolReportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-report/:id/edit',
        component: SchoolReportPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'school-report/:id/delete',
        component: SchoolReportDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.schoolReport.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
