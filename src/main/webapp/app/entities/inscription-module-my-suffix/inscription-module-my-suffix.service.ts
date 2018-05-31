import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InscriptionModuleMySuffix } from './inscription-module-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InscriptionModuleMySuffix>;

@Injectable()
export class InscriptionModuleMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/inscription-modules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(inscriptionModule: InscriptionModuleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(inscriptionModule);
        return this.http.post<InscriptionModuleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inscriptionModule: InscriptionModuleMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(inscriptionModule);
        return this.http.put<InscriptionModuleMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InscriptionModuleMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InscriptionModuleMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<InscriptionModuleMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InscriptionModuleMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InscriptionModuleMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InscriptionModuleMySuffix[]>): HttpResponse<InscriptionModuleMySuffix[]> {
        const jsonResponse: InscriptionModuleMySuffix[] = res.body;
        const body: InscriptionModuleMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InscriptionModuleMySuffix.
     */
    private convertItemFromServer(inscriptionModule: InscriptionModuleMySuffix): InscriptionModuleMySuffix {
        const copy: InscriptionModuleMySuffix = Object.assign({}, inscriptionModule);
        copy.inscriptionDate = this.dateUtils
            .convertLocalDateFromServer(inscriptionModule.inscriptionDate);
        return copy;
    }

    /**
     * Convert a InscriptionModuleMySuffix to a JSON which can be sent to the server.
     */
    private convert(inscriptionModule: InscriptionModuleMySuffix): InscriptionModuleMySuffix {
        const copy: InscriptionModuleMySuffix = Object.assign({}, inscriptionModule);
        copy.inscriptionDate = this.dateUtils
            .convertLocalDateToServer(inscriptionModule.inscriptionDate);
        return copy;
    }
}
