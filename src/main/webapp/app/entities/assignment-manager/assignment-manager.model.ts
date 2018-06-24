import { BaseEntity } from './../../shared';

export class AssignmentManager implements BaseEntity {
    constructor(
        public id?: number,
        public schoolYearId?: number,
        public schoolId?: number,
        public managers?: BaseEntity[],
    ) {
    }
}
