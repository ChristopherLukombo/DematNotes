import {BaseEntity} from '../shared';

export class AbsenceSearch implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public moduleId?: number,
        public accounts?: number[],
    ) {
    }
}
