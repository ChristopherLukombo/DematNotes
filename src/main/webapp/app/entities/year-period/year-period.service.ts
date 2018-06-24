import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { YearPeriod } from './year-period.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<YearPeriod>;

@Injectable()
export class YearPeriodService {

    private resourceUrl =  SERVER_API_URL + 'api/year-periods';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(yearPeriod: YearPeriod): Observable<EntityResponseType> {
        const copy = this.convert(yearPeriod);
        return this.http.post<YearPeriod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(yearPeriod: YearPeriod): Observable<EntityResponseType> {
        const copy = this.convert(yearPeriod);
        return this.http.put<YearPeriod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<YearPeriod>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<YearPeriod[]>> {
        const options = createRequestOption(req);
        return this.http.get<YearPeriod[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<YearPeriod[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: YearPeriod = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<YearPeriod[]>): HttpResponse<YearPeriod[]> {
        const jsonResponse: YearPeriod[] = res.body;
        const body: YearPeriod[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to YearPeriod.
     */
    private convertItemFromServer(yearPeriod: YearPeriod): YearPeriod {
        const copy: YearPeriod = Object.assign({}, yearPeriod);
        copy.startDate = this.dateUtils
            .convertLocalDateFromServer(yearPeriod.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateFromServer(yearPeriod.endDate);
        return copy;
    }

    /**
     * Convert a YearPeriod to a JSON which can be sent to the server.
     */
    private convert(yearPeriod: YearPeriod): YearPeriod {
        const copy: YearPeriod = Object.assign({}, yearPeriod);
        copy.startDate = this.dateUtils
            .convertLocalDateToServer(yearPeriod.startDate);
        copy.endDate = this.dateUtils
            .convertLocalDateToServer(yearPeriod.endDate);
        return copy;
    }
}
