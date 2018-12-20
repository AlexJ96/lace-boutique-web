import { Component } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import * as decodeJwt from "jwt-decode";
import { Router } from "../../../../../node_modules/@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public registerServerErrorMessage : String;

    get registerServerErrorMsg(){
        return this.registerServerErrorMessage;
    }

	constructor(private api: ApiService, private router: Router) {}

    async login(f){
        let response = await this.api.post("account/login", f.value);
        if (response.indexOf("Token:") != -1) {
            let token = response.slice(7);
            this.api.storeToken(token);
            this.router.navigateByUrl("/account");
        } else {
            this.registerServerErrorMessage = response;
        }
        console.log(this.api.getToken());
    }
    
}