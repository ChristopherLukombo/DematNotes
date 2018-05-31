import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TeacherMySuffix>;

@Injectable()
export class TeacherMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(teacher: TeacherMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(teacher);
        return this.http.post<TeacherMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(teacher: TeacherMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(teacher);
        return this.http.put<TeacherMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TeacherMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TeacherMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<TeacherMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TeacherMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TeacherMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TeacherMySuffix[]>): HttpResponse<TeacherMySuffix[]> {
        const jsonResponse: TeacherMySuffix[] = res.body;
        const body: TeacherMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TeacherMySuffix.
     */
    private convertItemFromServer(teacher: TeacherMySuffix): TeacherMySuffix {
        const copy: TeacherMySuffix = Object.assign({}, teacher);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(teacher.dateOfBirth);
        return copy;
    }

    /**
     * Convert a TeacherMySuffix to a JSON which can be sent to the server.
     */
    private convert(teacher: TeacherMySuffix): TeacherMySuffix {
        const copy: TeacherMySuffix = Object.assign({}, teacher);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(teacher.dateOfBirth);
        return copy;
    }
}
