import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    SchoolYearMySuffixService,
    SchoolYearMySuffixPopupService,
    SchoolYearMySuffixComponent,
    SchoolYearMySuffixDetailComponent,
    SchoolYearMySuffixDialogComponent,
    SchoolYearMySuffixPopupComponent,
    SchoolYearMySuffixDeletePopupComponent,
    SchoolYearMySuffixDeleteDialogComponent,
    schoolYearRoute,
    schoolYearPopupRoute,
} from './';

const ENTITY_STATES = [
    ...schoolYearRoute,
    ...schoolYearPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SchoolYearMySuffixComponent,
        SchoolYearMySuffixDetailComponent,
        SchoolYearMySuffixDialogComponent,
        SchoolYearMySuffixDeleteDialogComponent,
        SchoolYearMySuffixPopupComponent,
        SchoolYearMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        SchoolYearMySuffixComponent,
        SchoolYearMySuffixDialogComponent,
        SchoolYearMySuffixPopupComponent,
        SchoolYearMySuffixDeleteDialogComponent,
        SchoolYearMySuffixDeletePopupComponent,
    ],
    providers: [
        SchoolYearMySuffixService,
        SchoolYearMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesSchoolYearMySuffixModule {}
