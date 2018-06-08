import {Injectable} from "@angular/core";
import {SERVER_API_URL} from "../app.constants";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SchoolLifeService {

    private resourceUrl =  SERVER_API_URL + 'api';

    constructor(private http: HttpClient) {}

}
