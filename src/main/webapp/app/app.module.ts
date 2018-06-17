import './vendor.ts';

import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage';
import {JhiEventManager} from 'ng-jhipster';

import {AuthInterceptor} from './blocks/interceptor/auth.interceptor';
import {AuthExpiredInterceptor} from './blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from './blocks/interceptor/errorhandler.interceptor';
import {NotificationInterceptor} from './blocks/interceptor/notification.interceptor';
import {DematNotesSharedModule, UserRouteAccessService} from './shared';
import {DematNotesAppRoutingModule} from './app-routing.module';
import {DematNotesHomeModule} from './home/home.module';
import {DematNotesAdminModule} from './admin/admin.module';
import {DematNotesAccountModule} from './account/account.module';
import {DematNotesEntityModule} from './entities/entity.module';
import {PaginationConfig} from './blocks/config/uib-pagination.config';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
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

import {MarksComponent} from './marks/marks.component';
import {SchoolReportsComponent} from './school-reports/school-reports.component';
import {ResultsComponent} from './results/results.component';
import {SchoolLifeComponent} from './school-life/school-life.component';
import {SchoolReportService} from './school-reports/school-reports.service';

import {MarksService} from './marks/marks.service';
import {DialogComponent} from './dialog/dialog.component';
import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import {FileUploaderService} from './dialog/FileUploaderService';
import {SchoolLifeService} from './school-life/school-life.service';
import {SettingsService} from './account/settings/settings.service';

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
        MatGridListModule
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DematNotesAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        DematNotesSharedModule,
        DematNotesHomeModule,
        DematNotesAdminModule,
        DematNotesAccountModule,
        DematNotesEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
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
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        MarksComponent,
        SchoolReportsComponent,
        ResultsComponent,
        SchoolLifeComponent,
        DialogComponent,
    ],
    entryComponents: [
        DialogComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        SchoolReportService,
        MarksService,
        SchoolLifeService,
        FileUploaderService,
        SettingsService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DematNotesAppModule {}
