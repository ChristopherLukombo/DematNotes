import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DematNotesSharedModule} from '../shared';
import {
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule
} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {Services} from '../services';
import {viewschoolReportRoute} from './viewschool-reports.route';
import {ViewschoolReportComponent} from './viewschoolReport.component';

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild([viewschoolReportRoute]),
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
        MatInputModule
    ],
    declarations: [
        ViewschoolReportComponent,
    ],
    entryComponents: [
    ],
    providers: [
        Services
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesViewSchoolReportsModule {}
