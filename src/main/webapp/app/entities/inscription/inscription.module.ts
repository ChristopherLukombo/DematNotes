import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    InscriptionService,
    InscriptionPopupService,
    InscriptionComponent,
    InscriptionDetailComponent,
    InscriptionDialogComponent,
    InscriptionPopupComponent,
    InscriptionDeletePopupComponent,
    InscriptionDeleteDialogComponent,
    inscriptionRoute,
    inscriptionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...inscriptionRoute,
    ...inscriptionPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InscriptionComponent,
        InscriptionDetailComponent,
        InscriptionDialogComponent,
        InscriptionDeleteDialogComponent,
        InscriptionPopupComponent,
        InscriptionDeletePopupComponent,
    ],
    entryComponents: [
        InscriptionComponent,
        InscriptionDialogComponent,
        InscriptionPopupComponent,
        InscriptionDeleteDialogComponent,
        InscriptionDeletePopupComponent,
    ],
    providers: [
        InscriptionService,
        InscriptionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesInscriptionModule {}
