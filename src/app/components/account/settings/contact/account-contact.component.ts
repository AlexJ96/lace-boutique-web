import { Component } from "@angular/core";

import { ApiService } from "../../../../services/api.service";
import { AccountService } from "src/app/services/account.service";
import { Router } from "@angular/router";

@Component({
    selector: 'account-contact',
    templateUrl: './account-contact.component.html'
})
export class AccountContactComponent {

    mobile: boolean = false;

    discountsEmail: boolean = false;
    discountsText: boolean = false;

    newStuffEmail: boolean = false;
    newStuffText: boolean = false;



    constructor(private api: ApiService, private acc: AccountService, private route: Router) {}

    ngOnInit() {
        // this.account = this.acc.getAccount();
        if (window.innerWidth < 768)
            this.mobile = true;
    }

    selectAll() {
        this.discountsEmail = true;
        this.discountsText = true;
        this.newStuffEmail = true;
        this.newStuffText = true;
    }

}