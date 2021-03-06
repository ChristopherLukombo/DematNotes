import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {SchoolLifeComponent} from './school-life.component';
import {schoolLifeRoute} from './school-life.route';
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
import {Services} from '../services';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';

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
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([schoolLifeRoute]),
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
        MatAutocompleteModule,
        MatListModule,
        MatGridListModule,
        MatCheckboxModule,
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        SchoolLifeComponent,
    ],
    entryComponents: [
    ],
    providers: [
        Services,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesSchoolLifeModule {}
