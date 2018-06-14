import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {User} from '../shared';
import {Classroom} from '../entities/classroom';
import {School} from '../entities/school';
import {Student} from '../entities/student';
import {ChartData} from './chartData.model';
import {Module} from '../entities/module';

@Injectable()
export class MarksService {

    private resourceUrl =  SERVER_API_URL + 'api';

    constructor(private http: HttpClient) { }

    getSchoolsByCurrentUserTeacher(idUser: number) {
        return this.http.get<School[]>(this.resourceUrl + '/marks/displaySchools/' + `${idUser}`);
    }

    getClassroomsByCurrentUserTeacher(idUser, idSchool) {
        return this.http.get<Classroom[]>(this.resourceUrl + '/marks/displayClassrooms/' + `${idUser}/${idSchool}`);
    }

    getStudentsUserByCurrentUserTeacher(idUser, idSchool, idClassroom) {
        return this.http.get<User[]>(this.resourceUrl + '/marks/displayStudents/' + `${idUser}/${idSchool}/${idClassroom}`);
    }

    getStudentByIdUser(idUser) {
        return this.http.get<Student>(this.resourceUrl + '/marks/getStudentUser/' + `${idUser}`);
    }

    getStudentUserByIdUser(idUser) {
        return this.http.get<User>(this.resourceUrl + '/marks/getUser/' + `${idUser}`);
    }

    getData(idSchool, idClassroom) {
        return this.http.get<ChartData[]>(this.resourceUrl + '/marks/getData/' + `${idSchool}/${idClassroom}`);
    }

    getModules(idUser) {
        return this.http.get<Module[]>(this.resourceUrl + '/marks/teacher/modules/' + `${idUser}`);
    }

}
