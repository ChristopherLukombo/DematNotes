import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DematNotesStudentMySuffixModule } from './student-my-suffix/student-my-suffix.module';
import { DematNotesInscriptionModuleMySuffixModule } from './inscription-module-my-suffix/inscription-module-my-suffix.module';
import { DematNotesManagerMySuffixModule } from './manager-my-suffix/manager-my-suffix.module';
import { DematNotesTeacherMySuffixModule } from './teacher-my-suffix/teacher-my-suffix.module';
import { DematNotesAbsenceMySuffixModule } from './absence-my-suffix/absence-my-suffix.module';
import { DematNotesDelayStudentMySuffixModule } from './delay-student-my-suffix/delay-student-my-suffix.module';
import { DematNotesInterventionMySuffixModule } from './intervention-my-suffix/intervention-my-suffix.module';
import { DematNotesCourseMySuffixModule } from './course-my-suffix/course-my-suffix.module';
import { DematNotesModuleMySuffixModule } from './module-my-suffix/module-my-suffix.module';
import { DematNotesEvaluationMySuffixModule } from './evaluation-my-suffix/evaluation-my-suffix.module';
import { DematNotesSchoolReportMySuffixModule } from './school-report-my-suffix/school-report-my-suffix.module';
import { DematNotesSchoolMySuffixModule } from './school-my-suffix/school-my-suffix.module';
import { DematNotesClassroomMySuffixModule } from './classroom-my-suffix/classroom-my-suffix.module';
import { DematNotesSchoolYearMySuffixModule } from './school-year-my-suffix/school-year-my-suffix.module';
import { DematNotesDocumentMySuffixModule } from './document-my-suffix/document-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DematNotesStudentMySuffixModule,
        DematNotesInscriptionModuleMySuffixModule,
        DematNotesManagerMySuffixModule,
        DematNotesTeacherMySuffixModule,
        DematNotesAbsenceMySuffixModule,
        DematNotesDelayStudentMySuffixModule,
        DematNotesInterventionMySuffixModule,
        DematNotesCourseMySuffixModule,
        DematNotesModuleMySuffixModule,
        DematNotesEvaluationMySuffixModule,
        DematNotesSchoolReportMySuffixModule,
        DematNotesSchoolMySuffixModule,
        DematNotesClassroomMySuffixModule,
        DematNotesSchoolYearMySuffixModule,
        DematNotesDocumentMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DematNotesEntityModule {}
