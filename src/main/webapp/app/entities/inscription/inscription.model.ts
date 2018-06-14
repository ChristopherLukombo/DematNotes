import { BaseEntity } from './../../shared';

export class Inscription implements BaseEntity {
    constructor(
        public id?: number,
        public schoolId?: number,
        public classroomId?: number,
        public schoolYearId?: number,
        public students?: BaseEntity[],
    ) {
    }
}
