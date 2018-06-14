import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    DelayStudentService,
    DelayStudentPopupService,
    DelayStudentComponent,
    DelayStudentDetailComponent,
    DelayStudentDialogComponent,
    DelayStudentPopupComponent,
    DelayStudentDeletePopupComponent,
    DelayStudentDeleteDialogComponent,
    delayStudentRoute,
    delayStudentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...delayStudentRoute,
    ...delayStudentPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DelayStudentComponent,
        DelayStudentDetailComponent,
        DelayStudentDialogComponent,
        DelayStudentDeleteDialogComponent,
        DelayStudentPopupComponent,
        DelayStudentDeletePopupComponent,
    ],
    entryComponents: [
        DelayStudentComponent,
        DelayStudentDialogComponent,
        DelayStudentPopupComponent,
        DelayStudentDeleteDialogComponent,
        DelayStudentDeletePopupComponent,
    ],
    providers: [
        DelayStudentService,
        DelayStudentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesDelayStudentModule {}
