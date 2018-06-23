import {Route} from '@angular/router';
import {UserRouteAccessService} from '../shared';
import {DialogComponent} from './dialog.component';

export const dialogRoute: Route = {
    path: 'dialogRoute',
    component: DialogComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.dialogRoute'
    },
    canActivate: [UserRouteAccessService]
};
