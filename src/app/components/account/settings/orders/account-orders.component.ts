import { Component } from "@angular/core";

import { ApiService } from "../../../../services/api.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: 'account-orders',
    templateUrl: './account-orders.component.html'
})
export class AccountOrdersComponent {

    mobile: boolean = false;

    constructor(private api: ApiService, private acc: AccountService, private route: Router) {}

    ngOnInit() {
        // this.account = this.acc.getAccount();
        if (window.innerWidth < 768)
            this.mobile = true;
    }

}