import {HttpClient, HttpRequest} from '@angular/common/http';
import {SERVER_API_URL} from '../app.constants';
import {Document} from '../entities/document';
import {Injectable} from '@angular/core';

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

    downloadDocument(idDocument) {
        return this.http.get(this.resourceUrl + '/schoolLife/download/' + `${idDocument}`, {responseType: 'blob'});
    }

    deleteFile(idDocument) {
        return this.http.delete<Boolean>(this.resourceUrl + '/schoolLife/delete/' + `${idDocument}`);
    }

}
