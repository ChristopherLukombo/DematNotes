import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EvaluationMySuffixComponent } from './evaluation-my-suffix.component';
import { EvaluationMySuffixDetailComponent } from './evaluation-my-suffix-detail.component';
import { EvaluationMySuffixPopupComponent } from './evaluation-my-suffix-dialog.component';
import { EvaluationMySuffixDeletePopupComponent } from './evaluation-my-suffix-delete-dialog.component';

export const evaluationRoute: Routes = [
    {
        path: 'evaluation-my-suffix',
        component: EvaluationMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'evaluation-my-suffix/:id',
        component: EvaluationMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluationPopupRoute: Routes = [
    {
        path: 'evaluation-my-suffix-new',
        component: EvaluationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluation-my-suffix/:id/edit',
        component: EvaluationMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'evaluation-my-suffix/:id/delete',
        component: EvaluationMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dematNotesApp.evaluation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
