import { BaseEntity } from './../../shared';

export class Evaluation implements BaseEntity {
    constructor(
        public id?: number,
        public average?: number,
        public coefficient?: number,
        public evaluationDate?: any,
        public comment?: string,
        public validation?: string,
        public studentId?: number,
        public moduleId?: number,
        public teacherId?: number,
        public schoolReportId?: number,
    ) {
    }
}
