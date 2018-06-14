import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    InterventionService,
    InterventionPopupService,
    InterventionComponent,
    InterventionDetailComponent,
    InterventionDialogComponent,
    InterventionPopupComponent,
    InterventionDeletePopupComponent,
    InterventionDeleteDialogComponent,
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
        InterventionComponent,
        InterventionDetailComponent,
        InterventionDialogComponent,
        InterventionDeleteDialogComponent,
        InterventionPopupComponent,
        InterventionDeletePopupComponent,
    ],
    entryComponents: [
        InterventionComponent,
        InterventionDialogComponent,
        InterventionPopupComponent,
        InterventionDeleteDialogComponent,
        InterventionDeletePopupComponent,
    ],
    providers: [
        InterventionService,
        InterventionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesInterventionModule {}
