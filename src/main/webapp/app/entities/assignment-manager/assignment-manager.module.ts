import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    AssignmentManagerService,
    AssignmentManagerPopupService,
    AssignmentManagerComponent,
    AssignmentManagerDetailComponent,
    AssignmentManagerDialogComponent,
    AssignmentManagerPopupComponent,
    AssignmentManagerDeletePopupComponent,
    AssignmentManagerDeleteDialogComponent,
    assignmentManagerRoute,
    assignmentManagerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...assignmentManagerRoute,
    ...assignmentManagerPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssignmentManagerComponent,
        AssignmentManagerDetailComponent,
        AssignmentManagerDialogComponent,
        AssignmentManagerDeleteDialogComponent,
        AssignmentManagerPopupComponent,
        AssignmentManagerDeletePopupComponent,
    ],
    entryComponents: [
        AssignmentManagerComponent,
        AssignmentManagerDialogComponent,
        AssignmentManagerPopupComponent,
        AssignmentManagerDeleteDialogComponent,
        AssignmentManagerDeletePopupComponent,
    ],
    providers: [
        AssignmentManagerService,
        AssignmentManagerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesAssignmentManagerModule {}
