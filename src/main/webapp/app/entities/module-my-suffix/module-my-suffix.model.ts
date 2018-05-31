import { BaseEntity } from './../../shared';

export class ModuleMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public yearPeriod?: string,
        public optionModule?: boolean,
        public courseId?: number,
        public schoolId?: number,
    ) {
        this.optionModule = false;
    }
}
