import { BaseEntity } from './../../shared';

export class Teacher implements BaseEntity {
    constructor(
        public id?: number,
        public mobilePhoneNumber?: string,
        public fixePhoneNumber?: string,
        public address?: string,
        public city?: string,
        public postalCode?: string,
        public dateOfBirth?: any,
        public placeOfBirth?: string,
        public userId?: number,
        public specialModuleId?: number,
    ) {
    }
}
