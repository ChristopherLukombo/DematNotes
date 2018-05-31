import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import { DematNotesAdminModule } from '../../admin/admin.module';
import {
    ManagerMySuffixService,
    ManagerMySuffixPopupService,
    ManagerMySuffixComponent,
    ManagerMySuffixDetailComponent,
    ManagerMySuffixDialogComponent,
    ManagerMySuffixPopupComponent,
    ManagerMySuffixDeletePopupComponent,
    ManagerMySuffixDeleteDialogComponent,
    managerRoute,
    managerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...managerRoute,
    ...managerPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        DematNotesAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ManagerMySuffixComponent,
        ManagerMySuffixDetailComponent,
        ManagerMySuffixDialogComponent,
        ManagerMySuffixDeleteDialogComponent,
        ManagerMySuffixPopupComponent,
        ManagerMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ManagerMySuffixComponent,
        ManagerMySuffixDialogComponent,
        ManagerMySuffixPopupComponent,
        ManagerMySuffixDeleteDialogComponent,
        ManagerMySuffixDeletePopupComponent,
    ],
    providers: [
        ManagerMySuffixService,
        ManagerMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesManagerMySuffixModule {}
