import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DematNotesSharedModule } from '../../shared';
import {
    EvaluationService,
    EvaluationPopupService,
    EvaluationComponent,
    EvaluationDetailComponent,
    EvaluationDialogComponent,
    EvaluationPopupComponent,
    EvaluationDeletePopupComponent,
    EvaluationDeleteDialogComponent,
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
        EvaluationComponent,
        EvaluationDetailComponent,
        EvaluationDialogComponent,
        EvaluationDeleteDialogComponent,
        EvaluationPopupComponent,
        EvaluationDeletePopupComponent,
    ],
    entryComponents: [
        EvaluationComponent,
        EvaluationDialogComponent,
        EvaluationPopupComponent,
        EvaluationDeleteDialogComponent,
        EvaluationDeletePopupComponent,
    ],
    providers: [
        EvaluationService,
        EvaluationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesEvaluationModule {}
