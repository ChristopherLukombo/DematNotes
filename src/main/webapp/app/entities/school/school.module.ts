import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    SchoolService,
    SchoolPopupService,
    SchoolComponent,
    SchoolDetailComponent,
    SchoolDialogComponent,
    SchoolPopupComponent,
    SchoolDeletePopupComponent,
    SchoolDeleteDialogComponent,
    schoolRoute,
    schoolPopupRoute,
} from './';

const ENTITY_STATES = [
    ...schoolRoute,
    ...schoolPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SchoolComponent,
        SchoolDetailComponent,
        SchoolDialogComponent,
        SchoolDeleteDialogComponent,
        SchoolPopupComponent,
        SchoolDeletePopupComponent,
    ],
    entryComponents: [
        SchoolComponent,
        SchoolDialogComponent,
        SchoolPopupComponent,
        SchoolDeleteDialogComponent,
        SchoolDeletePopupComponent,
    ],
    providers: [
        SchoolService,
        SchoolPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesSchoolModule {}
