import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Module } from './module.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Module>;

@Injectable()
export class ModuleService {

    private resourceUrl =  SERVER_API_URL + 'api/modules';

    constructor(private http: HttpClient) { }

    create(module: Module): Observable<EntityResponseType> {
        const copy = this.convert(module);
        return this.http.post<Module>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(module: Module): Observable<EntityResponseType> {
        const copy = this.convert(module);
        return this.http.put<Module>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Module>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Module[]>> {
        const options = createRequestOption(req);
        return this.http.get<Module[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Module[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Module = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Module[]>): HttpResponse<Module[]> {
        const jsonResponse: Module[] = res.body;
        const body: Module[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Module.
     */
    private convertItemFromServer(module: Module): Module {
        const copy: Module = Object.assign({}, module);
        return copy;
    }

    /**
     * Convert a Module to a JSON which can be sent to the server.
     */
    private convert(module: Module): Module {
        const copy: Module = Object.assign({}, module);
        return copy;
    }
}
