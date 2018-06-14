import { BaseEntity } from './../../shared';

export class SchoolYear implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
    ) {
    }
}
