import { BaseEntity } from './../../shared';

export class SchoolReportMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public yearPeriod?: string,
        public gradeAword?: string,
        public comment?: string,
        public creationDate?: any,
        public evaluations?: BaseEntity[],
    ) {
    }
}
