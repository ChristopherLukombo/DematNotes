import { BaseEntity } from './../../shared';

export class InterventionMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public startDate?: any,
        public endDate?: any,
        public teacherId?: number,
        public moduleId?: number,
    ) {
    }
}
