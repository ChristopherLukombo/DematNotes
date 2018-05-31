import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StudentMySuffix } from './student-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<StudentMySuffix>;

@Injectable()
export class StudentMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/students';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(student: StudentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(student);
        return this.http.post<StudentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(student: StudentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(student);
        return this.http.put<StudentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<StudentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<StudentMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<StudentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<StudentMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: StudentMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<StudentMySuffix[]>): HttpResponse<StudentMySuffix[]> {
        const jsonResponse: StudentMySuffix[] = res.body;
        const body: StudentMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to StudentMySuffix.
     */
    private convertItemFromServer(student: StudentMySuffix): StudentMySuffix {
        const copy: StudentMySuffix = Object.assign({}, student);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(student.dateOfBirth);
        return copy;
    }

    /**
     * Convert a StudentMySuffix to a JSON which can be sent to the server.
     */
    private convert(student: StudentMySuffix): StudentMySuffix {
        const copy: StudentMySuffix = Object.assign({}, student);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(student.dateOfBirth);
        return copy;
    }
}
