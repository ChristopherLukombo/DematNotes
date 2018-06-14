import { BaseEntity } from './../../shared';

export class AssignmentModule implements BaseEntity {
    constructor(
        public id?: number,
        public coefficient?: number,
        public classroomId?: number,
        public schoolId?: number,
        public schoolYearId?: number,
        public teachers?: BaseEntity[],
        public modules?: BaseEntity[],
    ) {
    }
}
