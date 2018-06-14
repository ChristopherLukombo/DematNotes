import { BaseEntity } from './../../shared';

export class Student implements BaseEntity {
    constructor(
        public id?: number,
        public ine?: string,
        public email?: string,
        public mobilePhoneNumber?: string,
        public fixePhoneNumber?: string,
        public address?: string,
        public city?: string,
        public postalCode?: string,
        public dateOfBirth?: any,
        public placeOfBirth?: string,
        public documents?: BaseEntity[],
        public userId?: number,
    ) {
    }
}
