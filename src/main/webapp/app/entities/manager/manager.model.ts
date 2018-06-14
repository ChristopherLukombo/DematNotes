import { BaseEntity } from './../../shared';

export class Manager implements BaseEntity {
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
        public userId?: number,
    ) {
    }
}
