import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from './app.constants';
import {School} from './entities/school';
import {Classroom} from './entities/classroom';
import {User} from './shared';
import {Student} from './entities/student';
import {ChartData} from './marks';
import {Module} from './entities/module';
import {Results} from './results/results.model';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Services {

    private resourceUrl =  SERVER_API_URL + 'api';

    constructor(private http: HttpClient) { }

    /**
     *
     * Returns the schools according to the teacher's User ID
     * @param {number} idUser
     * @returns {Observable<School[]>}
     */
    getSchoolsByTeacher(idUser: number): Observable<School[]> {
        return this.http.get<School[]>(this.resourceUrl + '/marks/displaySchools/' + `${idUser}`);
    }

    /**
     * Returns the classrooms according the teacher's User ID and School ID
     * @param idUser
     * @param idSchool
     * @returns {Observable<Classroom[]>}
     */
    getClassroomsByTeacher(idUser, idSchool): Observable<Classroom[]> {
        return this.http.get<Classroom[]>(this.resourceUrl + '/marks/displayClassrooms/' + `${idUser}/${idSchool}`);
    }

    /**
     * Returns the classrooms according the teacher's User ID, School ID and Classroom ID
     * @param idUser
     * @param idSchool
     * @param idClassroom
     * @returns {Observable<User[]>}
     */
    getStudentsByTeacher(idUser, idSchool, idClassroom): Observable<User[]> {
        return this.http.get<User[]>(this.resourceUrl + '/marks/displayStudents/' + `${idUser}/${idSchool}/${idClassroom}`);
    }

    /**
     * Returns the student according the teacher's User ID
     * @param idUser
     * @returns {Observable<Student>}
     */
    getStudentByIdUser(idUser): Observable<Student> {
        return this.http.get<Student>(this.resourceUrl + '/marks/getStudentUser/' + `${idUser}`);
    }

    /**
     * Returns the student according the teacher's User ID
     * @param idUser
     * @returns {Observable<User>}
     */
    getStudentUserByIdUser(idUser): Observable<User> {
        return this.http.get<User>(this.resourceUrl + '/marks/getUser/' + `${idUser}`);
    }

    /**
     * Returns the chartData according School ID and Classroom ID
     * @param idSchool
     * @param idClassroom
     * @returns {Observable<ChartData[]>}
     */
    getData(idSchool, idClassroom): Observable<ChartData[]> {
        return this.http.get<ChartData[]>(this.resourceUrl + '/marks/getData/' + `${idSchool}/${idClassroom}`);
    }

    /**
     * Returns the modules according the teacher's User ID
     * @param idUser
     * @returns {Observable<Module[]>}
     */
    getModules(idUser): Observable<Module[]> {
        return this.http.get<Module[]>(this.resourceUrl + '/marks/teacher/modules/' + `${idUser}`);
    }

    /**
     * Returns the results according the Student's User ID
     * @param idUser
     * @returns {Observable<Results>}
     */
    getResultsByStudent(idUser): Observable<Results> {
        return this.http.get<Results>(this.resourceUrl + '/results/student/' + `${idUser}`);
    }

}
