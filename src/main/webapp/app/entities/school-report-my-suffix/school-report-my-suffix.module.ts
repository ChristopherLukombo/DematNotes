import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    SchoolReportMySuffixService,
    SchoolReportMySuffixPopupService,
    SchoolReportMySuffixComponent,
    SchoolReportMySuffixDetailComponent,
    SchoolReportMySuffixDialogComponent,
    SchoolReportMySuffixPopupComponent,
    SchoolReportMySuffixDeletePopupComponent,
    SchoolReportMySuffixDeleteDialogComponent,
    schoolReportRoute,
    schoolReportPopupRoute,
} from './';

const ENTITY_STATES = [
    ...schoolReportRoute,
    ...schoolReportPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SchoolReportMySuffixComponent,
        SchoolReportMySuffixDetailComponent,
        SchoolReportMySuffixDialogComponent,
        SchoolReportMySuffixDeleteDialogComponent,
        SchoolReportMySuffixPopupComponent,
        SchoolReportMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SchoolReportMySuffixComponent,
        SchoolReportMySuffixDialogComponent,
        SchoolReportMySuffixPopupComponent,
        SchoolReportMySuffixDeleteDialogComponent,
        SchoolReportMySuffixDeletePopupComponent,
    ],
    providers: [
        SchoolReportMySuffixService,
        SchoolReportMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesSchoolReportMySuffixModule {}
