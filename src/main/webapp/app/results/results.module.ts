import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {ResultsComponent} from './results.component';
import {resultsRoute} from './results.route';

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([resultsRoute])
    ],
    declarations: [
        ResultsComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesHomeModule {}
