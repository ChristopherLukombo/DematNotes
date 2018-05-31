import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    ModuleMySuffixService,
    ModuleMySuffixPopupService,
    ModuleMySuffixComponent,
    ModuleMySuffixDetailComponent,
    ModuleMySuffixDialogComponent,
    ModuleMySuffixPopupComponent,
    ModuleMySuffixDeletePopupComponent,
    ModuleMySuffixDeleteDialogComponent,
    moduleRoute,
    modulePopupRoute,
} from './';

const ENTITY_STATES = [
    ...moduleRoute,
    ...modulePopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ModuleMySuffixComponent,
        ModuleMySuffixDetailComponent,
        ModuleMySuffixDialogComponent,
        ModuleMySuffixDeleteDialogComponent,
        ModuleMySuffixPopupComponent,
        ModuleMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ModuleMySuffixComponent,
        ModuleMySuffixDialogComponent,
        ModuleMySuffixPopupComponent,
        ModuleMySuffixDeleteDialogComponent,
        ModuleMySuffixDeletePopupComponent,
    ],
    providers: [
        ModuleMySuffixService,
        ModuleMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesModuleMySuffixModule {}
