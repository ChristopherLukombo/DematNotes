import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    AssignmentYearPeriodService,
    AssignmentYearPeriodPopupService,
    AssignmentYearPeriodComponent,
    AssignmentYearPeriodDetailComponent,
    AssignmentYearPeriodDialogComponent,
    AssignmentYearPeriodPopupComponent,
    AssignmentYearPeriodDeletePopupComponent,
    AssignmentYearPeriodDeleteDialogComponent,
    assignmentYearPeriodRoute,
    assignmentYearPeriodPopupRoute,
} from './';

const ENTITY_STATES = [
    ...assignmentYearPeriodRoute,
    ...assignmentYearPeriodPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssignmentYearPeriodComponent,
        AssignmentYearPeriodDetailComponent,
        AssignmentYearPeriodDialogComponent,
        AssignmentYearPeriodDeleteDialogComponent,
        AssignmentYearPeriodPopupComponent,
        AssignmentYearPeriodDeletePopupComponent,
    ],
    entryComponents: [
        AssignmentYearPeriodComponent,
        AssignmentYearPeriodDialogComponent,
        AssignmentYearPeriodPopupComponent,
        AssignmentYearPeriodDeleteDialogComponent,
        AssignmentYearPeriodDeletePopupComponent,
    ],
    providers: [
        AssignmentYearPeriodService,
        AssignmentYearPeriodPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesAssignmentYearPeriodModule {}
