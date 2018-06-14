import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DelayStudent } from './delay-student.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DelayStudent>;

@Injectable()
export class DelayStudentService {

    private resourceUrl =  SERVER_API_URL + 'api/delay-students';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(delayStudent: DelayStudent): Observable<EntityResponseType> {
        const copy = this.convert(delayStudent);
        return this.http.post<DelayStudent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(delayStudent: DelayStudent): Observable<EntityResponseType> {
        const copy = this.convert(delayStudent);
        return this.http.put<DelayStudent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DelayStudent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DelayStudent[]>> {
        const options = createRequestOption(req);
        return this.http.get<DelayStudent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DelayStudent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DelayStudent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DelayStudent[]>): HttpResponse<DelayStudent[]> {
        const jsonResponse: DelayStudent[] = res.body;
        const body: DelayStudent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DelayStudent.
     */
    private convertItemFromServer(delayStudent: DelayStudent): DelayStudent {
        const copy: DelayStudent = Object.assign({}, delayStudent);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(delayStudent.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(delayStudent.endDate);
        return copy;
    }

    /**
     * Convert a DelayStudent to a JSON which can be sent to the server.
     */
    private convert(delayStudent: DelayStudent): DelayStudent {
        const copy: DelayStudent = Object.assign({}, delayStudent);

        copy.startDate = this.dateUtils.toDate(delayStudent.startDate);

        copy.endDate = this.dateUtils.toDate(delayStudent.endDate);
        return copy;
    }
}
