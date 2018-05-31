import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { DocumentMySuffix } from './document-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DocumentMySuffix>;

@Injectable()
export class DocumentMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/documents';

    constructor(private http: HttpClient) { }

    create(document: DocumentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(document);
        return this.http.post<DocumentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(document: DocumentMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(document);
        return this.http.put<DocumentMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DocumentMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DocumentMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<DocumentMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DocumentMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DocumentMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DocumentMySuffix[]>): HttpResponse<DocumentMySuffix[]> {
        const jsonResponse: DocumentMySuffix[] = res.body;
        const body: DocumentMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DocumentMySuffix.
     */
    private convertItemFromServer(document: DocumentMySuffix): DocumentMySuffix {
        const copy: DocumentMySuffix = Object.assign({}, document);
        return copy;
    }

    /**
     * Convert a DocumentMySuffix to a JSON which can be sent to the server.
     */
    private convert(document: DocumentMySuffix): DocumentMySuffix {
        const copy: DocumentMySuffix = Object.assign({}, document);
        return copy;
    }
}
