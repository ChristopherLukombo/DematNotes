import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AssignmentModule } from './assignment-module.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AssignmentModule>;

@Injectable()
export class AssignmentModuleService {

    private resourceUrl =  SERVER_API_URL + 'api/assignment-modules';

    constructor(private http: HttpClient) { }

    create(assignmentModule: AssignmentModule): Observable<EntityResponseType> {
        const copy = this.convert(assignmentModule);
        return this.http.post<AssignmentModule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(assignmentModule: AssignmentModule): Observable<EntityResponseType> {
        const copy = this.convert(assignmentModule);
        return this.http.put<AssignmentModule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AssignmentModule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AssignmentModule[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssignmentModule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssignmentModule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AssignmentModule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AssignmentModule[]>): HttpResponse<AssignmentModule[]> {
        const jsonResponse: AssignmentModule[] = res.body;
        const body: AssignmentModule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AssignmentModule.
     */
    private convertItemFromServer(assignmentModule: AssignmentModule): AssignmentModule {
        const copy: AssignmentModule = Object.assign({}, assignmentModule);
        return copy;
    }

    /**
     * Convert a AssignmentModule to a JSON which can be sent to the server.
     */
    private convert(assignmentModule: AssignmentModule): AssignmentModule {
        const copy: AssignmentModule = Object.assign({}, assignmentModule);
        return copy;
    }
}
