import { BaseEntity } from './../../shared';

export class TeacherMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public email?: string,
        public mobilePhoneNumber?: string,
        public fixePhoneNumber?: string,
        public address?: string,
        public city?: string,
        public postalCode?: string,
        public dateOfBirth?: any,
        public placeOfBirth?: string,
        public interventions?: BaseEntity[],
        public userId?: number,
        public specialCourseId?: number,
    ) {
    }
}
