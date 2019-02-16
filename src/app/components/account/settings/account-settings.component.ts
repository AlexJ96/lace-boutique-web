import { OnInit, Component } from "@angular/core";

import { ApiService } from "../../../services/api.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: 'account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.css']
})

export class AccountSettingsComponent implements OnInit {

    account: any;
    mobile: boolean = false;
    pageView = 'overview'

    constructor(private api: ApiService, private acc: AccountService, private route: Router) {}

    ngOnInit() {
        this.account = this.acc.getAccount();
        if (this.account == null || this.account == undefined) {
            this.route.navigateByUrl("account/login");
        }
        if (window.innerWidth < 768)
            this.mobile = true;
    }

    navigate(route) {
        if (this.mobile) {
            this.route.navigateByUrl("account/settings/"+route);
        } else {
            this.pageView = route;
        }
    }

}