import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ManagerMySuffix } from './manager-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ManagerMySuffix>;

@Injectable()
export class ManagerMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/managers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(manager: ManagerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(manager);
        return this.http.post<ManagerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(manager: ManagerMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(manager);
        return this.http.put<ManagerMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ManagerMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ManagerMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ManagerMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ManagerMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ManagerMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ManagerMySuffix[]>): HttpResponse<ManagerMySuffix[]> {
        const jsonResponse: ManagerMySuffix[] = res.body;
        const body: ManagerMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ManagerMySuffix.
     */
    private convertItemFromServer(manager: ManagerMySuffix): ManagerMySuffix {
        const copy: ManagerMySuffix = Object.assign({}, manager);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateFromServer(manager.dateOfBirth);
        return copy;
    }

    /**
     * Convert a ManagerMySuffix to a JSON which can be sent to the server.
     */
    private convert(manager: ManagerMySuffix): ManagerMySuffix {
        const copy: ManagerMySuffix = Object.assign({}, manager);
        copy.dateOfBirth = this.dateUtils
            .convertLocalDateToServer(manager.dateOfBirth);
        return copy;
    }
}
