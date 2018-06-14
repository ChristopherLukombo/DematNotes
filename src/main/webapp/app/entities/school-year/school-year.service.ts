import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { SchoolYear } from './school-year.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SchoolYear>;

@Injectable()
export class SchoolYearService {

    private resourceUrl =  SERVER_API_URL + 'api/school-years';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(schoolYear: SchoolYear): Observable<EntityResponseType> {
        const copy = this.convert(schoolYear);
        return this.http.post<SchoolYear>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(schoolYear: SchoolYear): Observable<EntityResponseType> {
        const copy = this.convert(schoolYear);
        return this.http.put<SchoolYear>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SchoolYear>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SchoolYear[]>> {
        const options = createRequestOption(req);
        return this.http.get<SchoolYear[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SchoolYear[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SchoolYear = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SchoolYear[]>): HttpResponse<SchoolYear[]> {
        const jsonResponse: SchoolYear[] = res.body;
        const body: SchoolYear[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolYear.
     */
    private convertItemFromServer(schoolYear: SchoolYear): SchoolYear {
        const copy: SchoolYear = Object.assign({}, schoolYear);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(schoolYear.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateFromServer(schoolYear.endDate);
        return copy;
    }

    /**
     * Convert a SchoolYear to a JSON which can be sent to the server.
     */
    private convert(schoolYear: SchoolYear): SchoolYear {
        const copy: SchoolYear = Object.assign({}, schoolYear);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(schoolYear.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(schoolYear.endDate);
        return copy;
    }
}
