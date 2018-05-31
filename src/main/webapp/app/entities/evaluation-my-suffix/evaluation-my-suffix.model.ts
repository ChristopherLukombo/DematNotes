import { BaseEntity } from './../../shared';

export class EvaluationMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public average?: number,
        public coefficient?: number,
        public evaluationDate?: any,
        public comment?: string,
        public moduleId?: number,
        public studentId?: number,
        public schoolReportId?: number,
    ) {
    }
}
