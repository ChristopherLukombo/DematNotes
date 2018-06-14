import { BaseEntity } from './../../shared';

export class Intervention implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public yearPeriod?: string,
        public startDate?: any,
        public endDate?: any,
        public moduleId?: number,
        public teachers?: BaseEntity[],
    ) {
    }
}
