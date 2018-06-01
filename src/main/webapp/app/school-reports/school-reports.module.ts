import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {SchoolReportsComponent} from './school-reports.component';
import {schoolReportsRoute} from './school-reports.route';

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([schoolReportsRoute])
    ],
    declarations: [
        SchoolReportsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesHomeModule {}
