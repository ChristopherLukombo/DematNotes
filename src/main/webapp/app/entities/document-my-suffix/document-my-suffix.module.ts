import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    DocumentMySuffixService,
    DocumentMySuffixPopupService,
    DocumentMySuffixComponent,
    DocumentMySuffixDetailComponent,
    DocumentMySuffixDialogComponent,
    DocumentMySuffixPopupComponent,
    DocumentMySuffixDeletePopupComponent,
    DocumentMySuffixDeleteDialogComponent,
    documentRoute,
    documentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentRoute,
    ...documentPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentMySuffixComponent,
        DocumentMySuffixDetailComponent,
        DocumentMySuffixDialogComponent,
        DocumentMySuffixDeleteDialogComponent,
        DocumentMySuffixPopupComponent,
        DocumentMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DocumentMySuffixComponent,
        DocumentMySuffixDialogComponent,
        DocumentMySuffixPopupComponent,
        DocumentMySuffixDeleteDialogComponent,
        DocumentMySuffixDeletePopupComponent,
    ],
    providers: [
        DocumentMySuffixService,
        DocumentMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesDocumentMySuffixModule {}
