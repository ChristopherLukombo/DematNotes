import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Teacher } from './teacher.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Teacher>;

@Injectable()
export class TeacherService {

    private resourceUrl =  SERVER_API_URL + 'api/teachers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(teacher: Teacher): Observable<EntityResponseType> {
        const copy = this.convert(teacher);
        return this.http.post<Teacher>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(teacher: Teacher): Observable<EntityResponseType> {
        const copy = this.convert(teacher);
        return this.http.put<Teacher>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Teacher>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Teacher[]>> {
        const options = createRequestOption(req);
        return this.http.get<Teacher[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Teacher[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Teacher = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Teacher[]>): HttpResponse<Teacher[]> {
        const jsonResponse: Teacher[] = res.body;
        const body: Teacher[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Teacher.
     */
    private convertItemFromServer(teacher: Teacher): Teacher {
        const copy: Teacher = Object.assign({}, teacher);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(teacher.dateOfBirth);
        return copy;
    }

    /**
     * Convert a Teacher to a JSON which can be sent to the server.
     */
    private convert(teacher: Teacher): Teacher {
        const copy: Teacher = Object.assign({}, teacher);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(teacher.dateOfBirth);
        return copy;
    }
}
