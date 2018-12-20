import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import * as decodeJwt from "jwt-decode";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(private api: ApiService) {}

    async login(f){
        let response = await this.api.post("account/login", f.value);
        if (response.indexOf("Token:") != -1) {
            let token = response.slice(6);
            this.api.storeToken(token);
        } else {
            //
        }
        console.log(this.api.getToken());
    }
    
}