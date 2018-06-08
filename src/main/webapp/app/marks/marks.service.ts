import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {User} from '../shared';
import {ClassroomMySuffix} from '../entities/classroom-my-suffix';
import {SchoolMySuffix} from '../entities/school-my-suffix';
import {StudentMySuffix} from '../entities/student-my-suffix';
import {ChartData} from './chartData.model';

@Injectable()
export class MarksService {

    private resourceUrl =  SERVER_API_URL + 'api';

    constructor(private http: HttpClient) { }

    getSchoolsByCurrentUserTeacher(idUser: number) {
        return this.http.get<SchoolMySuffix[]>(this.resourceUrl + '/marks/displaySchools/' + `${idUser}`);
    }

    getClassroomsByCurrentUserTeacher(idUser, idSchool) {
        return this.http.get<ClassroomMySuffix[]>(this.resourceUrl + '/marks/displayClassrooms/' + `${idUser}/${idSchool}`);
    }

    getStudentsUserByCurrentUserTeacher(idUser, idSchool, idClassroom) {
        return this.http.get<User[]>(this.resourceUrl + '/marks/displayStudents/' + `${idUser}/${idSchool}/${idClassroom}`);
    }

    getStudentByIdUser(idUser) {
        return this.http.get<StudentMySuffix>(this.resourceUrl + '/marks/getStudentUser/' + `${idUser}`);
     }

    getStudentUserByIdUser(idUser) {
        return this.http.get<User>(this.resourceUrl + '/marks/getUser/' + `${idUser}`);
    }

    getData(idSchool, idClassroom) {
        return this.http.get<ChartData[]>(this.resourceUrl + '/marks/getData/' + `${idSchool}/${idClassroom}`);
    }

}
