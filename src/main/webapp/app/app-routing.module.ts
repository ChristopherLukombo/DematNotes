import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from './app.constants';

import {marksRoute} from './marks/marks.route';
import {schoolReportsRoute} from './school-reports/school-reports.route';
import {resultsRoute} from './results/results.route';
import {schoolLifeRoute} from './school-life/school-life.route';

const LAYOUT_ROUTES = [
    navbarRoute,
    marksRoute,
    schoolReportsRoute,
    resultsRoute,
    schoolLifeRoute,
    ...errorRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true , enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [
        RouterModule
    ]
})
export class DematNotesAppRoutingModule {}
