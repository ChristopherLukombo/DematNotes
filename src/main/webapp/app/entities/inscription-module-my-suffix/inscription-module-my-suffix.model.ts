import { BaseEntity } from './../../shared';

export class InscriptionModuleMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public inscriptionDate?: any,
        public validation?: string,
        public yearPeriod?: string,
        public moduleId?: number,
        public studentId?: number,
    ) {
    }
}
