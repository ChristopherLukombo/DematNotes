import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {SchoolLifeComponent} from './school-life.component';
import {schoolLifeRoute} from './school-life.route';

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([schoolLifeRoute])
    ],
    declarations: [
        SchoolLifeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesHomeModule {}
