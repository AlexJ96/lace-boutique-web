import { OnInit, Component, ReflectiveInjector } from "@angular/core";

import { ApiService } from "../../../services/api.service";
import { Router } from "@angular/router";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: 'registration',

    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

    public registerServerErrorMessage: String;
    register = {};

    constructor(private api: ApiService, private router: Router, private account: AccountService) { }

    async ngOnInit() {
        if (this.account.getAccount() != null) {
            this.router.navigateByUrl("/account/settings");
        }
        this.registerServerErrorMessage = '';
    }

    async registerUser(f) {
        let data = f.value;
        let res = await this.api.post("account/register", data);
        if (res !== 'Complete') {
            this.registerServerErrorMessage = res;
        } else {
            let response = await this.api.post("account/login", data);
            if (response.indexOf("Token:") != -1) {
                let token = response.slice(7);
                this.api.storeToken(token);
                this.router.navigateByUrl("/account/settings");
            } else {
                this.registerServerErrorMessage = response;
            }
        }

    }

    get registerServerErrorMsg() {
        return this.registerServerErrorMessage;
    }


}