import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../app.constants';
import {HttpClient} from '@angular/common/http';
import {Absence} from '../entities/absence';

@Injectable()
export class SchoolLifeService {

    private resourceUrl =  SERVER_API_URL + 'api';

    constructor(private http: HttpClient) {}

    getAbsencesByStudent(idStudent: number) {
        return this.http.get<Absence[]>(this.resourceUrl + '/schoolLife/absences/' + `${idStudent}`);
    }

    getDelayStudentsByStudent(idStudent: number) {
        return this.http.get<Absence[]>(this.resourceUrl + '/schoolLife/delayStudent/' + `${idStudent}`);
    }

}
