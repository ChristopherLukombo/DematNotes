import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    YearPeriodService,
    YearPeriodPopupService,
    YearPeriodComponent,
    YearPeriodDetailComponent,
    YearPeriodDialogComponent,
    YearPeriodPopupComponent,
    YearPeriodDeletePopupComponent,
    YearPeriodDeleteDialogComponent,
    yearPeriodRoute,
    yearPeriodPopupRoute,
} from './';

const ENTITY_STATES = [
    ...yearPeriodRoute,
    ...yearPeriodPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        YearPeriodComponent,
        YearPeriodDetailComponent,
        YearPeriodDialogComponent,
        YearPeriodDeleteDialogComponent,
        YearPeriodPopupComponent,
        YearPeriodDeletePopupComponent,
    ],
    entryComponents: [
        YearPeriodComponent,
        YearPeriodDialogComponent,
        YearPeriodPopupComponent,
        YearPeriodDeleteDialogComponent,
        YearPeriodDeletePopupComponent,
    ],
    providers: [
        YearPeriodService,
        YearPeriodPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesYearPeriodModule {}
