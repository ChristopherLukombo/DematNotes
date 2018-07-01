import {Evaluation} from '../entities/evaluation';
import {Module} from '../entities/module';

export class SchoolReportList {
    constructor(
        public evaluations ?: Array<Evaluation>,
        public modules?: Array<Module>,
    ) {
    }
}
