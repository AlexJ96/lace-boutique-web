import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import * as decodeJwt from "jwt-decode";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public registerServerErrorMessage:  String = '';
    login = {
        email: "",
        password: ""
    }

    get registerServerErrorMsg(){
        return this.registerServerErrorMessage;
    }

	constructor(private api: ApiService, private router: Router, private account: AccountService) {}

    ngOnInit() {
        if (this.account.getAccount() != null) {
            this.router.navigateByUrl("/account/settings");
        }
    }


    async loginUser(f){
        let response = await this.api.post("account/login", f.value);
        if (response.indexOf("Token:") != -1) {
            let token = response.slice(7);
            this.api.storeToken(token);
            this.router.navigateByUrl("/account/settings");
        } else {
            this.registerServerErrorMessage = response;
        }
        console.log(this.api.getToken());
    }
    
}