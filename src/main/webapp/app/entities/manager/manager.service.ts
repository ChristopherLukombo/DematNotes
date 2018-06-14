import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Manager } from './manager.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Manager>;

@Injectable()
export class ManagerService {

    private resourceUrl =  SERVER_API_URL + 'api/managers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(manager: Manager): Observable<EntityResponseType> {
        const copy = this.convert(manager);
        return this.http.post<Manager>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(manager: Manager): Observable<EntityResponseType> {
        const copy = this.convert(manager);
        return this.http.put<Manager>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Manager>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Manager[]>> {
        const options = createRequestOption(req);
        return this.http.get<Manager[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Manager[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Manager = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Manager[]>): HttpResponse<Manager[]> {
        const jsonResponse: Manager[] = res.body;
        const body: Manager[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Manager.
     */
    private convertItemFromServer(manager: Manager): Manager {
        const copy: Manager = Object.assign({}, manager);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(manager.dateOfBirth);
        return copy;
    }

    /**
     * Convert a Manager to a JSON which can be sent to the server.
     */
    private convert(manager: Manager): Manager {
        const copy: Manager = Object.assign({}, manager);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(manager.dateOfBirth);
        return copy;
    }
}
