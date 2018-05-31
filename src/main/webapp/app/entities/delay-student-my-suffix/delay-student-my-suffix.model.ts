import { BaseEntity } from './../../shared';

export class DelayStudentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public reason?: string,
        public studentId?: number,
    ) {
    }
}
