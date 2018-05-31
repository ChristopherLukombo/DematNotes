import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SchoolReportMySuffix } from './school-report-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SchoolReportMySuffix>;

@Injectable()
export class SchoolReportMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/school-reports';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schoolReport: SchoolReportMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(schoolReport);
        return this.http.post<SchoolReportMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schoolReport: SchoolReportMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(schoolReport);
        return this.http.put<SchoolReportMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SchoolReportMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SchoolReportMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SchoolReportMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SchoolReportMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SchoolReportMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SchoolReportMySuffix[]>): HttpResponse<SchoolReportMySuffix[]> {
        const jsonResponse: SchoolReportMySuffix[] = res.body;
        const body: SchoolReportMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolReportMySuffix.
     */
    private convertItemFromServer(schoolReport: SchoolReportMySuffix): SchoolReportMySuffix {
        const copy: SchoolReportMySuffix = Object.assign({}, schoolReport);
        copy.creationDate = this.dateUtils
            .convertLocalDateFromServer(schoolReport.creationDate);
        return copy;
    }

    /**
     * Convert a SchoolReportMySuffix to a JSON which can be sent to the server.
     */
    private convert(schoolReport: SchoolReportMySuffix): SchoolReportMySuffix {
        const copy: SchoolReportMySuffix = Object.assign({}, schoolReport);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(schoolReport.creationDate);
        return copy;
    }
}
