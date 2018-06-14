import { BaseEntity } from './../../shared';

export class Module implements BaseEntity {
    constructor(
        public id?: number,
        public entitled?: string,
        public description?: string,
        public optionModule?: boolean,
    ) {
        this.optionModule = false;
    }
}
