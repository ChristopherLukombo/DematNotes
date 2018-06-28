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
import {DelayStudent} from './entities/delay-student';
import {JhiDateUtils} from 'ng-jhipster';
import {AbsenceSearch} from './school-life/absenceSearch';
import {SchoolReport} from './entities/school-report';
import {Evaluation} from './entities/evaluation';
import {Manager} from './entities/manager';
import {MarksList} from './marks/marksList.model';
import {StudentsList} from './marks/studentsList.model';
import {ModulesList} from './marks/modulesList.model';

@Injectable()
export class Services {

    private resourceUrl = SERVER_API_URL + 'api';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    // Part General

    /**
     *
     * Returns the schools according to the teacher's User ID
     * @param {number} idUser
     * @returns {Observable<School[]>}
     */
    getSchools(idUser: number): Observable<School[]> {
        return this.http.get<School[]>(this.resourceUrl + '/marks/displaySchools/' + `${idUser}`);
    }

    /**
     * Returns the classrooms according the teacher's User ID and School ID
     * @param idUser
     * @param idSchool
     * @returns {Observable<Classroom[]>}
     */
    getClassrooms(idUser, idSchool): Observable<Classroom[]> {
        return this.http.get<Classroom[]>(this.resourceUrl + '/marks/displayClassrooms/' + `${idUser}/${idSchool}`);
    }

    /**
     * Returns the classrooms according the teacher's User ID, School ID and Classroom ID
     * @param idUser
     * @param idSchool
     * @param idClassroom
     * @returns {Observable<User[]>}
     */
    getStudents(idUser, idSchool, idClassroom): Observable<User[]> {
        return this.http.get<User[]>(this.resourceUrl + '/marks/displayStudents/' + `${idUser}/${idSchool}/${idClassroom}`);
    }

    /**
     * Returns the students according to the teacher
     * @param userId
     * @param schoolId
     * @param classroomId
     * @return Promise<StudentsList>
     */
    getStudentsByTeacher(userId: number, schoolId: number, classroomId: number): Promise<StudentsList> {
        return this.http.get<StudentsList>(this.resourceUrl + '/marks/studentsList/' + `${userId}/${schoolId}/${classroomId}`)
            .toPromise();
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
     * Saves all Evaluations collecting
     * @param {MarksList} marksList
     * @returns {Observable<MarksList>}
     */
    saveEvaluations(marksList: MarksList) {
        return this.http.post<MarksList>(this.resourceUrl + '/marks/save/evaluations', marksList);
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
     * @param userId
     * @returns {Promise<ModulesList>}
     */
    getModules(userId, schoolId, classroomId): Promise<ModulesList> {
        return this.http.get<ModulesList>(this.resourceUrl + '/marks/teacher/modules/' + `${userId}/${schoolId}/${classroomId}`).toPromise();
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
    downloadSchoolReport(accountCode) {
        return this.http.get(this.resourceUrl + '/schoolReport/export/' + `${accountCode}`, {responseType: 'blob'});
    }

    /**
     * Returns all absences for student
     * @param {number} accountCode
     * @returns {Observable<Absence[]>}
     */
    getAbsences(accountCode: number) {
        return this.http.get<Absence[]>(this.resourceUrl + '/schoolLife/absences/' + `${accountCode}`);
    }

    /**
     * Returns all Delay for a student
     * @param {number} accountCode
     * @returns {Observable<Absence[]>}
     */
    getDelayStudents(accountCode: number) {
        return this.http.get<DelayStudent[]>(this.resourceUrl + '/schoolLife/delayStudents/' + `${accountCode}`);
    }

    /**
     * Returns modules according teacher ID and Classroom ID
     * @param {number} accountCode
     * @param {number} idClassroom
     * @returns {Observable<Module[]>}
     */
    getModulesByTeacherAndClassroom(accountCode: number, idClassroom: number) {
        return this.http.get<Module[]>(this.resourceUrl + '/schoolLife/modules/' + `${accountCode}` + '/' + `${idClassroom}`);
    }

    /**
     * Saves Absences of students in a module
     * @returns {Observable<Absence>}
     */
    saveAbsencesModules(absenceSearch) {
        return this.http.post<Absence>(this.resourceUrl + '/schoolLife/AbsencesModules', this.convert(absenceSearch));
    }

    /**
     * Convert a AbsenceSearch to a JSON which can be sent to the server.
     */
    private convert(absenceSearch: AbsenceSearch): AbsenceSearch {
        const copy: Absence = Object.assign({}, absenceSearch);

        copy.startDate = this.dateUtils.toDate(absenceSearch.startDate);

        copy.endDate = this.dateUtils.toDate(absenceSearch.endDate);
        return copy;
    }

    // Part Documents User

    /**
     * Uploads picture profile for a user
     * @param {File} file
     * @param accountCode
     * @returns {Observable<HttpEvent<any>>}
     */
    uploadPicture(file: File, accountCode: number) {
        const formData: FormData = new FormData();
        formData.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrl + '/schoolLife/upload/' + `${accountCode}`, formData, {
            reportProgress: true,
            responseType: 'text',

        });

        return this.http.request(req);
    }

    /**
     * Returns all documents for a user
     * @param accountCode
     * @returns {Observable<Document[]>}
     */
    getDocuments(accountCode) {
        return this.http.get<Document[]>(this.resourceUrl + '/schoolLife/getAllFiles/' + `${accountCode}`);
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

    // Part Manager

    /**
     *
     * Returns the schools according to the manager's User ID
     * @param {number} accountCode
     * @returns {Observable<School[]>}
     */
    getSchoolsByManager(accountCode: number): Observable<School[]> {
        return this.http.get<School[]>(this.resourceUrl + '/schoolReport/schools/' + `${accountCode}`);
    }

    /**
     * Returns the classrooms according the manager's User ID and School ID
     * @param idUser
     * @param idSchool
     * @returns {Observable<Classroom[]>}
     */
    getClassroomsByManager(accountCode, idSchool): Observable<Classroom[]> {
        return this.http.get<Classroom[]>(this.resourceUrl + '/schoolReport/classrooms/' + `${accountCode}/${idSchool}`);
    }

    /**
     * Returns the classrooms according the manager's User ID, School ID and Classroom ID
     * @param accountCode
     * @param idSchool
     * @param idClassroom
     * @returns {Observable<User[]>}
     */
    getStudentsByManager(accountCode, idSchool, idClassroom): Observable<User[]> {
        return this.http.get<User[]>(this.resourceUrl + '/schoolReport/students/' + `${accountCode}/${idSchool}/${idClassroom}`);
    }

    /**
     * Returns the student according the manager's User ID
     * @param accountCode
     * @returns {Observable<User>}
     */
    getStudentByManager(accountCode): Observable<User> {
        return this.http.get<User>(this.resourceUrl + '/schoolReport/student/' + `${accountCode}`);
    }

    /**
     * Saves a SchoolReport of a student
     * @param {SchoolReport} schoolReport
     * @returns {Observable<SchoolReport>}
     */
    saveSchoolReport(schoolReport: SchoolReport) {
        return this.http.post<SchoolReport>(this.resourceUrl + '/schoolReport/save', schoolReport);
    }

    /**
     * Returns evaluations of a Student
     * @param accountCode
     * @returns {Observable<Evaluation[]>}
     */
    getEvaluationsByStudent(accountCode) {
        return this.http.get<Evaluation[]>(this.resourceUrl + '/schoolReport/evaluations/' + `${accountCode}`);
    }

    /**
     * Returns a Manager according its user
     * @param User
     */
    findManagerByUser(user) {
        return this.http.post<Manager>(this.resourceUrl + '/schoolReport/manager', user);
    }

}
