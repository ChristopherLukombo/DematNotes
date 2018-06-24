import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DematNotesStudentModule } from './student/student.module';
import { DematNotesManagerModule } from './manager/manager.module';
import { DematNotesTeacherModule } from './teacher/teacher.module';
import { DematNotesAbsenceModule } from './absence/absence.module';
import { DematNotesDelayStudentModule } from './delay-student/delay-student.module';
import { DematNotesInterventionModule } from './intervention/intervention.module';
import { DematNotesModuleModule } from './module/module.module';
import { DematNotesEvaluationModule } from './evaluation/evaluation.module';
import { DematNotesSchoolReportModule } from './school-report/school-report.module';
import { DematNotesSchoolModule } from './school/school.module';
import { DematNotesClassroomModule } from './classroom/classroom.module';
import { DematNotesSchoolYearModule } from './school-year/school-year.module';
import { DematNotesDocumentModule } from './document/document.module';
import { DematNotesAssignmentModuleModule } from './assignment-module/assignment-module.module';
import { DematNotesInscriptionModule } from './inscription/inscription.module';
import { DematNotesYearPeriodModule } from './year-period/year-period.module';
import { DematNotesAssignmentManagerModule } from './assignment-manager/assignment-manager.module';
import { DematNotesAssignmentYearPeriodModule } from './assignment-year-period/assignment-year-period.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DematNotesStudentModule,
        DematNotesManagerModule,
        DematNotesTeacherModule,
        DematNotesAbsenceModule,
        DematNotesDelayStudentModule,
        DematNotesInterventionModule,
        DematNotesModuleModule,
        DematNotesEvaluationModule,
        DematNotesSchoolReportModule,
        DematNotesSchoolModule,
        DematNotesClassroomModule,
        DematNotesSchoolYearModule,
        DematNotesDocumentModule,
        DematNotesAssignmentModuleModule,
        DematNotesInscriptionModule,
        DematNotesYearPeriodModule,
        DematNotesAssignmentManagerModule,
        DematNotesAssignmentYearPeriodModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesEntityModule {}
