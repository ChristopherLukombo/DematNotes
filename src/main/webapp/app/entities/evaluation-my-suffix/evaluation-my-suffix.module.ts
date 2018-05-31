import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    EvaluationMySuffixService,
    EvaluationMySuffixPopupService,
    EvaluationMySuffixComponent,
    EvaluationMySuffixDetailComponent,
    EvaluationMySuffixDialogComponent,
    EvaluationMySuffixPopupComponent,
    EvaluationMySuffixDeletePopupComponent,
    EvaluationMySuffixDeleteDialogComponent,
    evaluationRoute,
    evaluationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...evaluationRoute,
    ...evaluationPopupRoute,
];

@NgModule({
    imports: [
        DematNotesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EvaluationMySuffixComponent,
        EvaluationMySuffixDetailComponent,
        EvaluationMySuffixDialogComponent,
        EvaluationMySuffixDeleteDialogComponent,
        EvaluationMySuffixPopupComponent,
        EvaluationMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EvaluationMySuffixComponent,
        EvaluationMySuffixDialogComponent,
        EvaluationMySuffixPopupComponent,
        EvaluationMySuffixDeleteDialogComponent,
        EvaluationMySuffixDeletePopupComponent,
    ],
    providers: [
        EvaluationMySuffixService,
        EvaluationMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesEvaluationMySuffixModule {}
