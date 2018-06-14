import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    AssignmentModuleService,
    AssignmentModulePopupService,
    AssignmentModuleComponent,
    AssignmentModuleDetailComponent,
    AssignmentModuleDialogComponent,
    AssignmentModulePopupComponent,
    AssignmentModuleDeletePopupComponent,
    AssignmentModuleDeleteDialogComponent,
    assignmentModuleRoute,
    assignmentModulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...assignmentModuleRoute,
    ...assignmentModulePopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssignmentModuleComponent,
        AssignmentModuleDetailComponent,
        AssignmentModuleDialogComponent,
        AssignmentModuleDeleteDialogComponent,
        AssignmentModulePopupComponent,
        AssignmentModuleDeletePopupComponent,
    ],
    entryComponents: [
        AssignmentModuleComponent,
        AssignmentModuleDialogComponent,
        AssignmentModulePopupComponent,
        AssignmentModuleDeleteDialogComponent,
        AssignmentModuleDeletePopupComponent,
    ],
    providers: [
        AssignmentModuleService,
        AssignmentModulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesAssignmentModuleModule {}
