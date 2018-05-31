import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    AbsenceMySuffixService,
    AbsenceMySuffixPopupService,
    AbsenceMySuffixComponent,
    AbsenceMySuffixDetailComponent,
    AbsenceMySuffixDialogComponent,
    AbsenceMySuffixPopupComponent,
    AbsenceMySuffixDeletePopupComponent,
    AbsenceMySuffixDeleteDialogComponent,
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
        AbsenceMySuffixComponent,
        AbsenceMySuffixDetailComponent,
        AbsenceMySuffixDialogComponent,
        AbsenceMySuffixDeleteDialogComponent,
        AbsenceMySuffixPopupComponent,
        AbsenceMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        AbsenceMySuffixComponent,
        AbsenceMySuffixDialogComponent,
        AbsenceMySuffixPopupComponent,
        AbsenceMySuffixDeleteDialogComponent,
        AbsenceMySuffixDeletePopupComponent,
    ],
    providers: [
        AbsenceMySuffixService,
        AbsenceMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesAbsenceMySuffixModule {}
