import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    InscriptionModuleMySuffixService,
    InscriptionModuleMySuffixPopupService,
    InscriptionModuleMySuffixComponent,
    InscriptionModuleMySuffixDetailComponent,
    InscriptionModuleMySuffixDialogComponent,
    InscriptionModuleMySuffixPopupComponent,
    InscriptionModuleMySuffixDeletePopupComponent,
    InscriptionModuleMySuffixDeleteDialogComponent,
    inscriptionModuleRoute,
    inscriptionModulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...inscriptionModuleRoute,
    ...inscriptionModulePopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InscriptionModuleMySuffixComponent,
        InscriptionModuleMySuffixDetailComponent,
        InscriptionModuleMySuffixDialogComponent,
        InscriptionModuleMySuffixDeleteDialogComponent,
        InscriptionModuleMySuffixPopupComponent,
        InscriptionModuleMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        InscriptionModuleMySuffixComponent,
        InscriptionModuleMySuffixDialogComponent,
        InscriptionModuleMySuffixPopupComponent,
        InscriptionModuleMySuffixDeleteDialogComponent,
        InscriptionModuleMySuffixDeletePopupComponent,
    ],
    providers: [
        InscriptionModuleMySuffixService,
        InscriptionModuleMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesInscriptionModuleMySuffixModule {}
