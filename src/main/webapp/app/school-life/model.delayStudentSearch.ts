import {BaseEntity} from '../shared';

export class DelayStudentSearch implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public moduleId?: number,
        public accountsCode?: number[],
    ) {
    }
}
