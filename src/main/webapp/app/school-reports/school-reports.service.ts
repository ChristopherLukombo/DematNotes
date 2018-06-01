import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption} from '../shared';
import {Observable} from 'rxjs/Observable';

export type EntityResponseType = HttpResponse<Object>;

@Injectable()
export class SchoolReportService {

    private resourceUrl =  SERVER_API_URL + 'api/schoolReport/export';

    constructor(private http: HttpClient) { }

    query(req?: any): Observable<HttpResponse<EntityResponseType>> {
        const options = createRequestOption(req);
        return this.http.get<EntityResponseType>(this.resourceUrl, { params: options, observe: 'response' });
    }

}
