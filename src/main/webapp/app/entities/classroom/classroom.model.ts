import { BaseEntity } from './../../shared';

export class Classroom implements BaseEntity {
    constructor(
        public id?: number,
        public entitled?: string,
        public option?: string,
        public division?: string,
    ) {
    }
}
