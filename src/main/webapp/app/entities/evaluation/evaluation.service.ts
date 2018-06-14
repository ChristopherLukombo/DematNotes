import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Evaluation } from './evaluation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Evaluation>;

@Injectable()
export class EvaluationService {

    private resourceUrl =  SERVER_API_URL + 'api/evaluations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(evaluation: Evaluation): Observable<EntityResponseType> {
        const copy = this.convert(evaluation);
        return this.http.post<Evaluation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(evaluation: Evaluation): Observable<EntityResponseType> {
        const copy = this.convert(evaluation);
        return this.http.put<Evaluation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Evaluation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Evaluation[]>> {
        const options = createRequestOption(req);
        return this.http.get<Evaluation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Evaluation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Evaluation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Evaluation[]>): HttpResponse<Evaluation[]> {
        const jsonResponse: Evaluation[] = res.body;
        const body: Evaluation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Evaluation.
     */
    private convertItemFromServer(evaluation: Evaluation): Evaluation {
        const copy: Evaluation = Object.assign({}, evaluation);
        copy.evaluationDate = this.dateUtils
            .convertDateTimeFromServer(evaluation.evaluationDate);
        return copy;
    }

    /**
     * Convert a Evaluation to a JSON which can be sent to the server.
     */
    private convert(evaluation: Evaluation): Evaluation {
        const copy: Evaluation = Object.assign({}, evaluation);

        copy.evaluationDate = this.dateUtils.toDate(evaluation.evaluationDate);
        return copy;
    }
}
