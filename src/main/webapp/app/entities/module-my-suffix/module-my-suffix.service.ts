import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ModuleMySuffix } from './module-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ModuleMySuffix>;

@Injectable()
export class ModuleMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/modules';

    constructor(private http: HttpClient) { }

    create(module: ModuleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(module);
        return this.http.post<ModuleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(module: ModuleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(module);
        return this.http.put<ModuleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ModuleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ModuleMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<ModuleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ModuleMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ModuleMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ModuleMySuffix[]>): HttpResponse<ModuleMySuffix[]> {
        const jsonResponse: ModuleMySuffix[] = res.body;
        const body: ModuleMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ModuleMySuffix.
     */
    private convertItemFromServer(module: ModuleMySuffix): ModuleMySuffix {
        const copy: ModuleMySuffix = Object.assign({}, module);
        return copy;
    }

    /**
     * Convert a ModuleMySuffix to a JSON which can be sent to the server.
     */
    private convert(module: ModuleMySuffix): ModuleMySuffix {
        const copy: ModuleMySuffix = Object.assign({}, module);
        return copy;
    }
}
