import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { SchoolMySuffix } from './school-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<SchoolMySuffix>;

@Injectable()
export class SchoolMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/schools';

    constructor(private http: HttpClient) { }

    create(school: SchoolMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(school);
        return this.http.post<SchoolMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(school: SchoolMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(school);
        return this.http.put<SchoolMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<SchoolMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<SchoolMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<SchoolMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<SchoolMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: SchoolMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<SchoolMySuffix[]>): HttpResponse<SchoolMySuffix[]> {
        const jsonResponse: SchoolMySuffix[] = res.body;
        const body: SchoolMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to SchoolMySuffix.
     */
    private convertItemFromServer(school: SchoolMySuffix): SchoolMySuffix {
        const copy: SchoolMySuffix = Object.assign({}, school);
        return copy;
    }

    /**
     * Convert a SchoolMySuffix to a JSON which can be sent to the server.
     */
    private convert(school: SchoolMySuffix): SchoolMySuffix {
        const copy: SchoolMySuffix = Object.assign({}, school);
        return copy;
    }
}
