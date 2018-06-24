import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AssignmentManager } from './assignment-manager.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AssignmentManager>;

@Injectable()
export class AssignmentManagerService {

    private resourceUrl =  SERVER_API_URL + 'api/assignment-managers';

    constructor(private http: HttpClient) { }

    create(assignmentManager: AssignmentManager): Observable<EntityResponseType> {
        const copy = this.convert(assignmentManager);
        return this.http.post<AssignmentManager>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(assignmentManager: AssignmentManager): Observable<EntityResponseType> {
        const copy = this.convert(assignmentManager);
        return this.http.put<AssignmentManager>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AssignmentManager>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AssignmentManager[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssignmentManager[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssignmentManager[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AssignmentManager = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AssignmentManager[]>): HttpResponse<AssignmentManager[]> {
        const jsonResponse: AssignmentManager[] = res.body;
        const body: AssignmentManager[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AssignmentManager.
     */
    private convertItemFromServer(assignmentManager: AssignmentManager): AssignmentManager {
        const copy: AssignmentManager = Object.assign({}, assignmentManager);
        return copy;
    }

    /**
     * Convert a AssignmentManager to a JSON which can be sent to the server.
     */
    private convert(assignmentManager: AssignmentManager): AssignmentManager {
        const copy: AssignmentManager = Object.assign({}, assignmentManager);
        return copy;
    }
}
