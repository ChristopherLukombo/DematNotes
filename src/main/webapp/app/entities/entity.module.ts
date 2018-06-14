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
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesEntityModule {}
