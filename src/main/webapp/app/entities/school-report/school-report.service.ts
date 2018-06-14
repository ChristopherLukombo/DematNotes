import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SchoolReport } from './school-report.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SchoolReport>;

@Injectable()
export class SchoolReportService {

    private resourceUrl =  SERVER_API_URL + 'api/school-reports';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schoolReport: SchoolReport): Observable<EntityResponseType> {
        const copy = this.convert(schoolReport);
        return this.http.post<SchoolReport>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schoolReport: SchoolReport): Observable<EntityResponseType> {
        const copy = this.convert(schoolReport);
        return this.http.put<SchoolReport>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SchoolReport>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SchoolReport[]>> {
        const options = createRequestOption(req);
        return this.http.get<SchoolReport[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SchoolReport[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SchoolReport = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SchoolReport[]>): HttpResponse<SchoolReport[]> {
        const jsonResponse: SchoolReport[] = res.body;
        const body: SchoolReport[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolReport.
     */
    private convertItemFromServer(schoolReport: SchoolReport): SchoolReport {
        const copy: SchoolReport = Object.assign({}, schoolReport);
        copy.creationDate = this.dateUtils
            .convertLocalDateFromServer(schoolReport.creationDate);
        return copy;
    }

    /**
     * Convert a SchoolReport to a JSON which can be sent to the server.
     */
    private convert(schoolReport: SchoolReport): SchoolReport {
        const copy: SchoolReport = Object.assign({}, schoolReport);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(schoolReport.creationDate);
        return copy;
    }
}
