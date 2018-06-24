import { BaseEntity } from './../../shared';

export class YearPeriod implements BaseEntity {
    constructor(
        public id?: number,
        public entitled?: string,
        public startDate?: any,
        public endDate?: any,
    ) {
    }
}
