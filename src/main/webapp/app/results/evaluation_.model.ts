import { BaseEntity } from './../shared';
import {Module} from '../entities/module';

export class Evaluation implements BaseEntity {
    constructor(
        public id?: number,
        public average?: number,
        public evaluationDate?: any,
        public comment?: string,
        public yearPeriod?: string,
        public validation?: string,
        public studentId?: number,
        public module?: Module,
        public schoolReportId?: number,
    ) {
    }
}
