import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as decodeJwt from "jwt-decode";

@Injectable()
export class ApiService {

    apiUrl = "http://localhost:8080/laceApi/";

    constructor(private http: HttpClient) { }

    async post(endpoint: String, body: any = {}) {
        let token = localStorage.getItem("lbt");
        if (token == null || token == undefined)
            token = await this.requestNewToken();
        return new Promise<any>(resolve => {
            this.http.post<any>(this.apiUrl + endpoint, JSON.stringify(body), {
                headers: new HttpHeaders().append('LBT', 'LBTokenBearer ' + token)
            }).subscribe(
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
                .set("Authorization", "Bearer " + this.getToken())
        };
    }

    getToken() {
        try {
            if (localStorage.getItem("lbt")) {
              var token = localStorage.getItem("lbt");
              if (token == null || token == undefined || token == "") {
                return null;
              }
              return decodeJwt(token);
            } else {
              return null;
            }
          }
          catch (err) {
            return null;
          }
    }

    async refreshToken() {
        let token = localStorage.getItem("lbt");
        if (token != null || token != undefined) {
            token = await this.post("token/refresh-token", {Token: token});
        } else {
            token = await this.requestNewToken();
        }
        return token;
    }

    async requestNewToken() {
        let token = await this.get("token/request-token");
        localStorage.setItem("lbt", token);
        return token;
    }

    storeToken(token) {
        localStorage.setItem("lbt", token);
    }
}