import { BaseEntity } from './../../shared';

export class SchoolReport implements BaseEntity {
    constructor(
        public id?: number,
        public gradeAword?: string,
        public comment?: string,
        public creationDate?: any,
        public evaluations?: BaseEntity[],
        public yearPeriodId?: number,
        public studentId?: number,
        public managerId?: number,
    ) {
    }
}
