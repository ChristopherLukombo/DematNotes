import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Intervention } from './intervention.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Intervention>;

@Injectable()
export class InterventionService {

    private resourceUrl =  SERVER_API_URL + 'api/interventions';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(intervention: Intervention): Observable<EntityResponseType> {
        const copy = this.convert(intervention);
        return this.http.post<Intervention>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(intervention: Intervention): Observable<EntityResponseType> {
        const copy = this.convert(intervention);
        return this.http.put<Intervention>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Intervention>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Intervention[]>> {
        const options = createRequestOption(req);
        return this.http.get<Intervention[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Intervention[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Intervention = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Intervention[]>): HttpResponse<Intervention[]> {
        const jsonResponse: Intervention[] = res.body;
        const body: Intervention[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Intervention.
     */
    private convertItemFromServer(intervention: Intervention): Intervention {
        const copy: Intervention = Object.assign({}, intervention);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(intervention.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(intervention.endDate);
        return copy;
    }

    /**
     * Convert a Intervention to a JSON which can be sent to the server.
     */
    private convert(intervention: Intervention): Intervention {
        const copy: Intervention = Object.assign({}, intervention);

        copy.startDate = this.dateUtils.toDate(intervention.startDate);

        copy.endDate = this.dateUtils.toDate(intervention.endDate);
        return copy;
    }
}
