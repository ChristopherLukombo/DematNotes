import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    SchoolReportService,
    SchoolReportPopupService,
    SchoolReportComponent,
    SchoolReportDetailComponent,
    SchoolReportDialogComponent,
    SchoolReportPopupComponent,
    SchoolReportDeletePopupComponent,
    SchoolReportDeleteDialogComponent,
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
        SchoolReportComponent,
        SchoolReportDetailComponent,
        SchoolReportDialogComponent,
        SchoolReportDeleteDialogComponent,
        SchoolReportPopupComponent,
        SchoolReportDeletePopupComponent,
    ],
    entryComponents: [
        SchoolReportComponent,
        SchoolReportDialogComponent,
        SchoolReportPopupComponent,
        SchoolReportDeleteDialogComponent,
        SchoolReportDeletePopupComponent,
    ],
    providers: [
        SchoolReportService,
        SchoolReportPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesSchoolReportModule {}
