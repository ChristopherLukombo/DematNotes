import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AbsenceMySuffix } from './absence-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AbsenceMySuffix>;

@Injectable()
export class AbsenceMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/absences';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(absence: AbsenceMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(absence);
        return this.http.post<AbsenceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(absence: AbsenceMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(absence);
        return this.http.put<AbsenceMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AbsenceMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AbsenceMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<AbsenceMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AbsenceMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AbsenceMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AbsenceMySuffix[]>): HttpResponse<AbsenceMySuffix[]> {
        const jsonResponse: AbsenceMySuffix[] = res.body;
        const body: AbsenceMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AbsenceMySuffix.
     */
    private convertItemFromServer(absence: AbsenceMySuffix): AbsenceMySuffix {
        const copy: AbsenceMySuffix = Object.assign({}, absence);
        copy.startDate = this.dateUtils
            .convertDateTimeFromServer(absence.startDate);
        copy.endDate = this.dateUtils
            .convertDateTimeFromServer(absence.endDate);
        return copy;
    }

    /**
     * Convert a AbsenceMySuffix to a JSON which can be sent to the server.
     */
    private convert(absence: AbsenceMySuffix): AbsenceMySuffix {
        const copy: AbsenceMySuffix = Object.assign({}, absence);

        copy.startDate = this.dateUtils.toDate(absence.startDate);

        copy.endDate = this.dateUtils.toDate(absence.endDate);
        return copy;
    }
}
