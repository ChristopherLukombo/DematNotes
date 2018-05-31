import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClassroomMySuffix } from './classroom-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClassroomMySuffix>;

@Injectable()
export class ClassroomMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/classrooms';

    constructor(private http: HttpClient) { }

    create(classroom: ClassroomMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(classroom);
        return this.http.post<ClassroomMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(classroom: ClassroomMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(classroom);
        return this.http.put<ClassroomMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClassroomMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClassroomMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClassroomMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClassroomMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClassroomMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClassroomMySuffix[]>): HttpResponse<ClassroomMySuffix[]> {
        const jsonResponse: ClassroomMySuffix[] = res.body;
        const body: ClassroomMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClassroomMySuffix.
     */
    private convertItemFromServer(classroom: ClassroomMySuffix): ClassroomMySuffix {
        const copy: ClassroomMySuffix = Object.assign({}, classroom);
        return copy;
    }

    /**
     * Convert a ClassroomMySuffix to a JSON which can be sent to the server.
     */
    private convert(classroom: ClassroomMySuffix): ClassroomMySuffix {
        const copy: ClassroomMySuffix = Object.assign({}, classroom);
        return copy;
    }
}
