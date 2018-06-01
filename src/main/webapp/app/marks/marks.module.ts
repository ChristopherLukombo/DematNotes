import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {MarksComponent} from './marks.component';
import {marksRoute} from './marks.route';

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([marksRoute])
    ],
    declarations: [
        MarksComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesHomeModule {}
