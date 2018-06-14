import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';

@Injectable()
export class SchoolReportService {

    private resourceUrl =  SERVER_API_URL + 'api/';

    constructor(private http: HttpClient) { }

    downloadSchoolReport() {
        return this.http.get(this.resourceUrl + 'schoolReport/export', {responseType: 'blob'});
    }

}
