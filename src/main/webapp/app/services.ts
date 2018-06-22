import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from './app.constants';
import {School} from './entities/school';
import {Classroom} from './entities/classroom';
import {User} from './shared';
import {Student} from './entities/student';
import {ChartData} from './marks';
import {Module} from './entities/module';
import {Results} from './results/results.model';
import {Observable} from 'rxjs/Observable';
import {Absence} from './entities/absence';
import {Document} from './entities/document';

@Injectable()
export class Services {

    private resourceUrl =  SERVER_API_URL + 'api';

    constructor(private http: HttpClient) { }

    // Part General

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

    // Part Marks

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

    // Part Results

    /**
     * Returns the results according the Student's User ID
     * @param idUser
     * @returns {Observable<Results>}
     */
    getResultsByStudent(idUser): Observable<Results> {
        return this.http.get<Results>(this.resourceUrl + '/results/student/' + `${idUser}`);
    }

    // Part SchoolReport

    /**
     * Downloads a schoolReport
     * @returns {Observable<Blob>}
     */
    downloadSchoolReport() {
        return this.http.get(this.resourceUrl + '/schoolReport/export', {responseType: 'blob'});
    }

    /**
     * Returns all absences for student
     * @param {number} idStudent
     * @returns {Observable<Absence[]>}
     */
    getAbsencesByStudent(idStudent: number) {
        return this.http.get<Absence[]>(this.resourceUrl + '/schoolLife/absences/' + `${idStudent}`);
    }

    /**
     * Returns all Delay for a student
     * @param {number} idStudent
     * @returns {Observable<Absence[]>}
     */
    getDelayStudentsByStudent(idStudent: number) {
        return this.http.get<Absence[]>(this.resourceUrl + '/schoolLife/delayStudent/' + `${idStudent}`);
    }

    // Part Profile

    /**
     * Uploads picture profile for a user
     * @param {File} file
     * @param idStudent
     * @returns {Observable<HttpEvent<any>>}
     */
    uploadPicture(file: File, idStudent: any) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrl +  '/schoolLife/upload/' + `${idStudent}`, formdata, {
            reportProgress: true,
            responseType: 'text',

        });

        return this.http.request(req);
    }

    // Part Documents User

    /**
     * Returns all documents for a user
     * @param idUser
     * @returns {Observable<Document[]>}
     */
    getDocuments(idUser) {
        return this.http.get<Document[]>(this.resourceUrl + '/schoolLife/getAllFiles/' + `${idUser}`);
    }

    /**
     * Downloads a document
     * @param idDocument
     * @returns {Observable<Blob>}
     */
    downloadDocument(idDocument) {
        return this.http.get(this.resourceUrl + '/schoolLife/download/' + `${idDocument}`, {responseType: 'blob'});
    }

    /**
     * Deletes the document for a student
     * @param idDocument
     * @returns {Observable<Boolean>}
     */
    deleteDocument(idDocument) {
        return this.http.delete<Boolean>(this.resourceUrl + '/schoolLife/delete/' + `${idDocument}`);
    }

}