import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EvaluationComponent } from './evaluation.component';
import { EvaluationDetailComponent } from './evaluation-detail.component';
import { EvaluationPopupComponent } from './evaluation-dialog.component';
import { EvaluationDeletePopupComponent } from './evaluation-delete-dialog.component';

export const evaluationRoute: Routes = [
    {
        path: 'evaluation',
        component: EvaluationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evaluation/:id',
        component: EvaluationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluationPopupRoute: Routes = [
    {
        path: 'evaluation-new',
        component: EvaluationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluation/:id/edit',
        component: EvaluationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluation/:id/delete',
        component: EvaluationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
