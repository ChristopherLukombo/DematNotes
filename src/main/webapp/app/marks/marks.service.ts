import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption, User} from '../shared';
import {ClassroomMySuffix} from '../entities/classroom-my-suffix/classroom-my-suffix.model';
import {SchoolMySuffix, SchoolMySuffixService } from '../entities/school-my-suffix';
import {StudentMySuffix } from '../entities/student-my-suffix';
import {ChartData} from './chartData.model';

export type EntitySchoolResponseType = HttpResponse<SchoolMySuffix>;
export type EntityStudentResponseType  = HttpResponse<StudentMySuffix>;
export type EntityUserResponseType = HttpResponse<User>;

@Injectable()
export class MarksService {

    constructor(private http: HttpClient) { }

    getSchoolsByCurrentUserTeacher(idUser: number) {
        return this.http.get<SchoolMySuffix[]>(SERVER_API_URL + 'api/marks/displaySchools/' + `${idUser}`,
             { observe: 'response'}).map((res: HttpResponse<SchoolMySuffix[]>) => this.convertArraySchoolsResponse(res));
    }

    getClassroomsByCurrentUserTeacher(idUser, idSchool) {
        return this.http.get<ClassroomMySuffix[]>(SERVER_API_URL + 'api/marks/displayClassrooms/' + `${idUser}/${idSchool}`,
        { observe: 'response'}).map((res: HttpResponse<ClassroomMySuffix[]>) => this.convertArrayClassroomsResponse(res));
    }

    getStudentsUserByCurrentUserTeacher(idUser, idSchool, idClassroom) {
        return this.http.get<User[]>(SERVER_API_URL + 'api/marks/displayStudents/' + `${idUser}/${idSchool}/${idClassroom}`,
        { observe: 'response'}).map((res: HttpResponse<User[]>) => this.convertArrayUsersResponse(res));
    }

    getStudentByIdUser(idUser) {
        return this.http.get<StudentMySuffix>(SERVER_API_URL + 'api/marks/getStudentUser/' + `${idUser}`,
        { observe: 'response'}).map((res: HttpResponse<StudentMySuffix>) => this.convertStudentResponse(res));
     }

    getStudentUserByIdUser(idUser) {
        return this.http.get<User>(SERVER_API_URL + 'api/marks/getUser/' + `${idUser}`,
        { observe: 'response'}).map((res: HttpResponse<User>) => this.convertUserResponse(res));
    }

    getData(idSchool, idClassroom) {
        return this.http.get<ChartData[]>(SERVER_API_URL + 'api/marks/getData/' + `${idSchool}/${idClassroom}`);
    }

    private convertResponse(res: EntitySchoolResponseType): EntitySchoolResponseType {
        const body: SchoolMySuffix = this.convertItemSchoolFromServer(res.body);
        return res.clone({body});
    }

    private convertArraySchoolsResponse(res: HttpResponse<SchoolMySuffix[]>): HttpResponse<SchoolMySuffix[]> {
        const jsonResponse: SchoolMySuffix[] = res.body;
        const body: SchoolMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemSchoolFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolMySuffix.
     */
    private convertItemSchoolFromServer(school: SchoolMySuffix): SchoolMySuffix {
        const copy: SchoolMySuffix = Object.assign({}, school);
        return copy;
    }

    private convertArrayClassroomsResponse(res: HttpResponse<ClassroomMySuffix[]>): HttpResponse<ClassroomMySuffix[]> {
        const jsonResponse: ClassroomMySuffix[] = res.body;
        const body: ClassroomMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemClassroomFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClassroomMySuffix.
     */
    private convertItemClassroomFromServer(classroom: ClassroomMySuffix): ClassroomMySuffix {
        const copy: ClassroomMySuffix = Object.assign({}, classroom);
        return copy;
    }

    private convertArrayUsersResponse(res: HttpResponse<User[]>): HttpResponse<User[]> {
        const jsonResponse: User[] = res.body;
        const body: User[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemUserFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertUserResponse(res: EntityUserResponseType): EntityUserResponseType {
        const body: User = this.convertItemUserFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to User.
     */
    private convertItemUserFromServer(user: User): User {
        const copy: User = Object.assign({}, user);
        return copy;
    }

    private convertStudentResponse(res: EntityStudentResponseType): EntityStudentResponseType {
        const body: StudentMySuffix = this.convertItemStudentFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Student.
     */
    private convertItemStudentFromServer(student: StudentMySuffix): StudentMySuffix {
        const copy: StudentMySuffix = Object.assign({}, student);
        return copy;
    }

}
