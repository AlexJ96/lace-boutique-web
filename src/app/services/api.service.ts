import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {

    apiUrl = "http://localhost:8080/laceApi/";

    constructor(private http: HttpClient) { }

    post(endpoint: String, body: any = {}) {
        console.log(localStorage.getItem("lbt"));
        return new Promise<any>(resolve => {
            this.http.post<any>(this.apiUrl + endpoint, JSON.stringify(body), {
                headers: new HttpHeaders().append('LBT', 'LBTokenBearer ' + localStorage.getItem("lbt"))}).subscribe(
                    response => {
                        //this.handleApiResponse(response, surpressErrors);
                        resolve(response);
                    },
                    error => {
                        console.log(error);
                        // this.handleApiResponse(error, surpressErrors);
                    }
                );
        });
    }

    get(endpoint: String) {
        return new Promise<any>(resolve => {
            this.http.get<any>(this.apiUrl + endpoint).subscribe(
                response => {
                    resolve(response);
                },
                error => {
                    console.log(error);
                }
            );
        });
    }

    delete(endpoint: String) {
        return new Promise<any>(resolve => {
            this.http.delete(this.apiUrl + endpoint).subscribe(
                response => {
                    resolve(response);
                },
                error => {
                    console.log(error);
                }
            );
        })
    }

    getHttpOptions() {
        return {
            observe: "response" as 'response',
            headers: new HttpHeaders()
                .set("Content-Type", "application/json; charset=utf-8")
                .set("Authorization", "Bearer " +localStorage.getItem("lbt"))
        };
    }
}