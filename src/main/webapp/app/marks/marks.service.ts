import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {createRequestOption, User} from '../shared';
import {Observable} from 'rxjs/Observable';
import {ClassroomMySuffix} from '../entities/classroom-my-suffix/classroom-my-suffix.model';
import {Mark} from './mark.model';

@Injectable()
export class MarksService {

    private resourceUrl =  SERVER_API_URL + 'api/marks';

    constructor(private http: HttpClient) { }

    query(req?: any): Observable<HttpResponse<ClassroomMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<Mark[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Mark[]>) => this.convertArrayResponse(res));
    }

    private convertArrayResponse(res: HttpResponse<Mark[]>): HttpResponse<ClassroomMySuffix[]> {
        const jsonResponse: Mark[] = res.body;
        const body: Mark[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Mark.
     */
    private convertItemFromServer(marks: Mark): Mark {
        const copy: ClassroomMySuffix = Object.assign({}, marks);
        return copy;
    }

    getUser(req?: any): Observable<User[]>  {
        const options = createRequestOption(req);
        return this.http.get<User[]>(SERVER_API_URL + 'api/students/classroom');
    }

}
