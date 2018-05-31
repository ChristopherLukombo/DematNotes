import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EvaluationMySuffix } from './evaluation-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EvaluationMySuffix>;

@Injectable()
export class EvaluationMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/evaluations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(evaluation: EvaluationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(evaluation);
        return this.http.post<EvaluationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(evaluation: EvaluationMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(evaluation);
        return this.http.put<EvaluationMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EvaluationMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EvaluationMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<EvaluationMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EvaluationMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EvaluationMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EvaluationMySuffix[]>): HttpResponse<EvaluationMySuffix[]> {
        const jsonResponse: EvaluationMySuffix[] = res.body;
        const body: EvaluationMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EvaluationMySuffix.
     */
    private convertItemFromServer(evaluation: EvaluationMySuffix): EvaluationMySuffix {
        const copy: EvaluationMySuffix = Object.assign({}, evaluation);
        copy.evaluationDate = this.dateUtils
            .convertDateTimeFromServer(evaluation.evaluationDate);
        return copy;
    }

    /**
     * Convert a EvaluationMySuffix to a JSON which can be sent to the server.
     */
    private convert(evaluation: EvaluationMySuffix): EvaluationMySuffix {
        const copy: EvaluationMySuffix = Object.assign({}, evaluation);

        copy.evaluationDate = this.dateUtils.toDate(evaluation.evaluationDate);
        return copy;
    }
}
