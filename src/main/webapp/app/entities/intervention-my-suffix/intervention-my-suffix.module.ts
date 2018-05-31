import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    InterventionMySuffixService,
    InterventionMySuffixPopupService,
    InterventionMySuffixComponent,
    InterventionMySuffixDetailComponent,
    InterventionMySuffixDialogComponent,
    InterventionMySuffixPopupComponent,
    InterventionMySuffixDeletePopupComponent,
    InterventionMySuffixDeleteDialogComponent,
    interventionRoute,
    interventionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...interventionRoute,
    ...interventionPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InterventionMySuffixComponent,
        InterventionMySuffixDetailComponent,
        InterventionMySuffixDialogComponent,
        InterventionMySuffixDeleteDialogComponent,
        InterventionMySuffixPopupComponent,
        InterventionMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        InterventionMySuffixComponent,
        InterventionMySuffixDialogComponent,
        InterventionMySuffixPopupComponent,
        InterventionMySuffixDeleteDialogComponent,
        InterventionMySuffixDeletePopupComponent,
    ],
    providers: [
        InterventionMySuffixService,
        InterventionMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesInterventionMySuffixModule {}
