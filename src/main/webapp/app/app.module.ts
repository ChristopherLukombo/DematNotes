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
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import {DematNotesMarksModule} from './marks/marks.module';
import {DematNotesSchoolReportsModule} from './school-reports/school-reports.module';
import {DematNotesSchoolLifeModule} from './school-life/school-life.module';
import {DematNotesResultsModule} from './results/results.module';
import {DematNotesDialogModule} from './dialog/dialog.module';
import {DematNotesViewSchoolReportsModule} from './viewschoolReport/viewschoolReport.module';

@NgModule({
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
        DematNotesMarksModule,
        DematNotesSchoolReportsModule,
        DematNotesSchoolLifeModule,
        DematNotesResultsModule,
        DematNotesDialogModule,
        DematNotesViewSchoolReportsModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
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
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DematNotesAppModule {}
