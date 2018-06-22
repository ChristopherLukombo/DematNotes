import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {DematNotesSharedModule} from '../shared';
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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DialogComponent} from './dialog.component';
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
        ReactiveFormsModule,
        FormsModule,
        MatMenuModule,
        MatTabsModule,
        MatSelectModule,
        MatTableModule,
        MatFormFieldModule,
        MatButtonToggleModule,
        MatIconModule,
        MatDialogModule,
        MatListModule,
        MatGridListModule
    ],
    declarations: [
        DialogComponent
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [
        Services
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesDialogModule {
}
