import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AssignmentYearPeriod } from './assignment-year-period.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AssignmentYearPeriod>;

@Injectable()
export class AssignmentYearPeriodService {

    private resourceUrl =  SERVER_API_URL + 'api/assignment-year-periods';

    constructor(private http: HttpClient) { }

    create(assignmentYearPeriod: AssignmentYearPeriod): Observable<EntityResponseType> {
        const copy = this.convert(assignmentYearPeriod);
        return this.http.post<AssignmentYearPeriod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(assignmentYearPeriod: AssignmentYearPeriod): Observable<EntityResponseType> {
        const copy = this.convert(assignmentYearPeriod);
        return this.http.put<AssignmentYearPeriod>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AssignmentYearPeriod>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AssignmentYearPeriod[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssignmentYearPeriod[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssignmentYearPeriod[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AssignmentYearPeriod = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AssignmentYearPeriod[]>): HttpResponse<AssignmentYearPeriod[]> {
        const jsonResponse: AssignmentYearPeriod[] = res.body;
        const body: AssignmentYearPeriod[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AssignmentYearPeriod.
     */
    private convertItemFromServer(assignmentYearPeriod: AssignmentYearPeriod): AssignmentYearPeriod {
        const copy: AssignmentYearPeriod = Object.assign({}, assignmentYearPeriod);
        return copy;
    }

    /**
     * Convert a AssignmentYearPeriod to a JSON which can be sent to the server.
     */
    private convert(assignmentYearPeriod: AssignmentYearPeriod): AssignmentYearPeriod {
        const copy: AssignmentYearPeriod = Object.assign({}, assignmentYearPeriod);
        return copy;
    }
}
