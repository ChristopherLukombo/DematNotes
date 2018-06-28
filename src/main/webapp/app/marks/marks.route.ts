import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';
import {MarksComponent} from './marks.component';
export const marksRoute: Route = {
    path: 'marks',
    component: MarksComponent,
    data: {
        authorities: ['ROLE_ADMIN', 'ROLE_TEACHER'],
        pageTitle: 'global.menu.marks'
    },
    canActivate: [UserRouteAccessService]
};
