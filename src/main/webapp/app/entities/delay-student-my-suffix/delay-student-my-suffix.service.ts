import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DelayStudentMySuffix } from './delay-student-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DelayStudentMySuffix>;

@Injectable()
export class DelayStudentMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/delay-students';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(delayStudent: DelayStudentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(delayStudent);
        return this.http.post<DelayStudentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(delayStudent: DelayStudentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(delayStudent);
        return this.http.put<DelayStudentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DelayStudentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DelayStudentMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DelayStudentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DelayStudentMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DelayStudentMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DelayStudentMySuffix[]>): HttpResponse<DelayStudentMySuffix[]> {
        const jsonResponse: DelayStudentMySuffix[] = res.body;
        const body: DelayStudentMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DelayStudentMySuffix.
     */
    private convertItemFromServer(delayStudent: DelayStudentMySuffix): DelayStudentMySuffix {
        const copy: DelayStudentMySuffix = Object.assign({}, delayStudent);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(delayStudent.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(delayStudent.endDate);
        return copy;
    }

    /**
     * Convert a DelayStudentMySuffix to a JSON which can be sent to the server.
     */
    private convert(delayStudent: DelayStudentMySuffix): DelayStudentMySuffix {
        const copy: DelayStudentMySuffix = Object.assign({}, delayStudent);

        copy.startDate = this.dateUtils.toDate(delayStudent.startDate);

        copy.endDate = this.dateUtils.toDate(delayStudent.endDate);
        return copy;
    }
}
