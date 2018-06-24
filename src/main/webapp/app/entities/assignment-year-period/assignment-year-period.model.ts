import { BaseEntity } from './../../shared';

export class AssignmentYearPeriod implements BaseEntity {
    constructor(
        public id?: number,
        public schoolId?: number,
        public yearPeriods?: BaseEntity[],
        public classrooms?: BaseEntity[],
    ) {
    }
}
