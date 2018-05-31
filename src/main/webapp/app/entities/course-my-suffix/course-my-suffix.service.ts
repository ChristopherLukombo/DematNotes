import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CourseMySuffix } from './course-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CourseMySuffix>;

@Injectable()
export class CourseMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/courses';

    constructor(private http: HttpClient) { }

    create(course: CourseMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(course);
        return this.http.post<CourseMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(course: CourseMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(course);
        return this.http.put<CourseMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CourseMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CourseMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<CourseMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CourseMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CourseMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CourseMySuffix[]>): HttpResponse<CourseMySuffix[]> {
        const jsonResponse: CourseMySuffix[] = res.body;
        const body: CourseMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CourseMySuffix.
     */
    private convertItemFromServer(course: CourseMySuffix): CourseMySuffix {
        const copy: CourseMySuffix = Object.assign({}, course);
        return copy;
    }

    /**
     * Convert a CourseMySuffix to a JSON which can be sent to the server.
     */
    private convert(course: CourseMySuffix): CourseMySuffix {
        const copy: CourseMySuffix = Object.assign({}, course);
        return copy;
    }
}
