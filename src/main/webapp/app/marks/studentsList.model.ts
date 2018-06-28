import {Student} from '../entities/student';
import {UserService} from '../shared';

export class StudentsList {
    private _students: Array<Student>;
    private _users: Array<UserService>;

    get students(): Array<Student> {
        return this._students;
    }

    set students(value: Array<Student>) {
        this._students = value;
    }

    get users(): Array<UserService> {
        return this._users;
    }

    set users(value: Array<UserService>) {
        this._users = value;
    }
}
