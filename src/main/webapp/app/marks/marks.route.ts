import { Route } from '@angular/router';
import { UserRouteAccessService } from '../shared';

export const marksRoute: Route = {
    path: 'marks',
    component: MarksComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.marks'
    },
    canActivate: [UserRouteAccessService]
};
