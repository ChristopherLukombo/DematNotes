import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    DelayStudentMySuffixService,
    DelayStudentMySuffixPopupService,
    DelayStudentMySuffixComponent,
    DelayStudentMySuffixDetailComponent,
    DelayStudentMySuffixDialogComponent,
    DelayStudentMySuffixPopupComponent,
    DelayStudentMySuffixDeletePopupComponent,
    DelayStudentMySuffixDeleteDialogComponent,
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
        DelayStudentMySuffixComponent,
        DelayStudentMySuffixDetailComponent,
        DelayStudentMySuffixDialogComponent,
        DelayStudentMySuffixDeleteDialogComponent,
        DelayStudentMySuffixPopupComponent,
        DelayStudentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DelayStudentMySuffixComponent,
        DelayStudentMySuffixDialogComponent,
        DelayStudentMySuffixPopupComponent,
        DelayStudentMySuffixDeleteDialogComponent,
        DelayStudentMySuffixDeletePopupComponent,
    ],
    providers: [
        DelayStudentMySuffixService,
        DelayStudentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesDelayStudentMySuffixModule {}
