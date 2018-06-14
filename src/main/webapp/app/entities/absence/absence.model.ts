import { BaseEntity } from './../../shared';

export class Absence implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public moduleId?: number,
        public students?: BaseEntity[],
    ) {
    }
}
