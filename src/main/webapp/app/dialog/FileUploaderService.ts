import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {Document} from '../entities/document';

@Injectable()
export class FileUploaderService {
    private resourceUrl = SERVER_API_URL + 'api';

    constructor(private http: HttpClient) {
    }

    uploadImage(file: File, idStudent: any) {
        const formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', this.resourceUrl +  '/schoolLife/upload/' + `${idStudent}`, formdata, {
            reportProgress: true,
            responseType: 'text',

        });

        return this.http.request(req);
    }

    getFiles(idUser) {
        return this.http.get<Document[]>(this.resourceUrl + '/schoolLife/getAllFiles/' + `${idUser}`);
    }

}
