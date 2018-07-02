import { BaseEntity } from '../shared';
import {Module} from '../entities/module';
import {Teacher} from '../entities/teacher';
import {SchoolReport} from '../entities/school-report';
import {Student} from '../entities/student';

export class Evaluation implements BaseEntity {
    constructor(
        public id?: number,
        public average?: number,
        public coefficient?: number,
        public evaluationDate?: any,
        public comment?: string,
        public validation?: string,
        public student?: Student,
        public module?: Module,
        public teacher?: Teacher,
        public schoolReport?: SchoolReport,
    ) {
    }
}
