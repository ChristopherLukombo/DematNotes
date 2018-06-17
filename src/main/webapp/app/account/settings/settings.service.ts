import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SERVER_API_URL} from '../../app.constants';

@Injectable()
export class SettingsService {
    private resourceUrl = SERVER_API_URL + 'api';

    constructor(private http: HttpClient) {
    }

    uploadImage(file: File, idUser: any) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrl +  '/setting/upload/' + `${idUser}`, formdata, {
            responseType: 'text',

        });

        return this.http.request(req);
    }

}
