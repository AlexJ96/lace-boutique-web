import { Component } from "@angular/core";

import { ApiService } from "../../../../services/api.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: 'account-overview',
    templateUrl: './account-overview.component.html'
})
export class AccountOverviewComponent {

    mobile: boolean = false;
    account: any;

    constructor(private api: ApiService, private acc: AccountService, private route: Router) {}

    ngOnInit() {
        this.account = this.acc.getAccount();
        if (window.innerWidth < 768)
            this.mobile = true;
    }

}