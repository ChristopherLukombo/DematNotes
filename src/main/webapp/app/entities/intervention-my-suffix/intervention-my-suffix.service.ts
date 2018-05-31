import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InterventionMySuffix } from './intervention-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InterventionMySuffix>;

@Injectable()
export class InterventionMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/interventions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(intervention: InterventionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(intervention);
        return this.http.post<InterventionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervention: InterventionMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(intervention);
        return this.http.put<InterventionMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InterventionMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InterventionMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<InterventionMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InterventionMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InterventionMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InterventionMySuffix[]>): HttpResponse<InterventionMySuffix[]> {
        const jsonResponse: InterventionMySuffix[] = res.body;
        const body: InterventionMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InterventionMySuffix.
     */
    private convertItemFromServer(intervention: InterventionMySuffix): InterventionMySuffix {
        const copy: InterventionMySuffix = Object.assign({}, intervention);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(intervention.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(intervention.endDate);
        return copy;
    }

    /**
     * Convert a InterventionMySuffix to a JSON which can be sent to the server.
     */
    private convert(intervention: InterventionMySuffix): InterventionMySuffix {
        const copy: InterventionMySuffix = Object.assign({}, intervention);

        copy.startDate = this.dateUtils.toDate(intervention.startDate);

        copy.endDate = this.dateUtils.toDate(intervention.endDate);
        return copy;
    }
}
