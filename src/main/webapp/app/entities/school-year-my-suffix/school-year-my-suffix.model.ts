import { BaseEntity } from './../../shared';

export class SchoolYearMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
    ) {
    }
}
