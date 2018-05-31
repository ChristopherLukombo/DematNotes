import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SchoolYearMySuffix } from './school-year-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SchoolYearMySuffix>;

@Injectable()
export class SchoolYearMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/school-years';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schoolYear: SchoolYearMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(schoolYear);
        return this.http.post<SchoolYearMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schoolYear: SchoolYearMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(schoolYear);
        return this.http.put<SchoolYearMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SchoolYearMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SchoolYearMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SchoolYearMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SchoolYearMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SchoolYearMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SchoolYearMySuffix[]>): HttpResponse<SchoolYearMySuffix[]> {
        const jsonResponse: SchoolYearMySuffix[] = res.body;
        const body: SchoolYearMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolYearMySuffix.
     */
    private convertItemFromServer(schoolYear: SchoolYearMySuffix): SchoolYearMySuffix {
        const copy: SchoolYearMySuffix = Object.assign({}, schoolYear);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(schoolYear.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateFromServer(schoolYear.endDate);
        return copy;
    }

    /**
     * Convert a SchoolYearMySuffix to a JSON which can be sent to the server.
     */
    private convert(schoolYear: SchoolYearMySuffix): SchoolYearMySuffix {
        const copy: SchoolYearMySuffix = Object.assign({}, schoolYear);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(schoolYear.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(schoolYear.endDate);
        return copy;
    }
}
