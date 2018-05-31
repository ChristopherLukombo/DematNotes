import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import { DematNotesAdminModule } from '../../admin/admin.module';
import {
    StudentMySuffixService,
    StudentMySuffixPopupService,
    StudentMySuffixComponent,
    StudentMySuffixDetailComponent,
    StudentMySuffixDialogComponent,
    StudentMySuffixPopupComponent,
    StudentMySuffixDeletePopupComponent,
    StudentMySuffixDeleteDialogComponent,
    studentRoute,
    studentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...studentRoute,
    ...studentPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        DematNotesAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        StudentMySuffixComponent,
        StudentMySuffixDetailComponent,
        StudentMySuffixDialogComponent,
        StudentMySuffixDeleteDialogComponent,
        StudentMySuffixPopupComponent,
        StudentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        StudentMySuffixComponent,
        StudentMySuffixDialogComponent,
        StudentMySuffixPopupComponent,
        StudentMySuffixDeleteDialogComponent,
        StudentMySuffixDeletePopupComponent,
    ],
    providers: [
        StudentMySuffixService,
        StudentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesStudentMySuffixModule {}
