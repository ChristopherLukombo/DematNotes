import { BaseEntity } from './../../shared';

export class ClassroomMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public entitled?: string,
    ) {
    }
}
