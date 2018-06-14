import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    AbsenceService,
    AbsencePopupService,
    AbsenceComponent,
    AbsenceDetailComponent,
    AbsenceDialogComponent,
    AbsencePopupComponent,
    AbsenceDeletePopupComponent,
    AbsenceDeleteDialogComponent,
    absenceRoute,
    absencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...absenceRoute,
    ...absencePopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AbsenceComponent,
        AbsenceDetailComponent,
        AbsenceDialogComponent,
        AbsenceDeleteDialogComponent,
        AbsencePopupComponent,
        AbsenceDeletePopupComponent,
    ],
    entryComponents: [
        AbsenceComponent,
        AbsenceDialogComponent,
        AbsencePopupComponent,
        AbsenceDeleteDialogComponent,
        AbsenceDeletePopupComponent,
    ],
    providers: [
        AbsenceService,
        AbsencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesAbsenceModule {}
