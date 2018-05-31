import { BaseEntity } from './../../shared';

export class CourseMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public entitled?: string,
        public description?: string,
    ) {
    }
}
