import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {MarksComponent} from './marks.component';
import {marksRoute} from './marks.route';
import {
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {CdkTableModule} from '@angular/cdk/table';
import {ChartsModule} from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Services} from '../services';

@NgModule({
    exports: [
        MatMenuModule,
        MatTabsModule,
        MatSelectModule,
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        CdkTableModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatListModule,
        MatGridListModule,
    ],
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([marksRoute]),
        ReactiveFormsModule,
        FormsModule,
        MatMenuModule,
        MatTabsModule,
        MatSelectModule,
        MatTableModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatIconModule,
        ChartsModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatListModule,
        MatGridListModule
    ],
    declarations: [
        MarksComponent,
    ],
    entryComponents: [
    ],
    providers: [
        Services
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesMarksModule {}
