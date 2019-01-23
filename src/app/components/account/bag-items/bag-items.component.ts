import { OnInit, Component } from "@angular/core";
import { AccountService } from "src/app/services/account.service";
import { ApiService } from "src/app/services/api.service";

@Component({
    selector: 'bag-items',
    templateUrl: './bag-items.component.html',
    styleUrls: ['./bag-items.component.css']
})
export class BagItemsComponent implements OnInit {

    constructor(public account: AccountService, private api: ApiService) {}
    ngOnInit() {
        console.log(this.account.getCart());
    }

    async removeItem(cartItem) {
        let account = this.account.getAccount();
        let response = await this.api.post("account/removeCartItem", { accountId: account.id, cartId: cartItem.id });
       // console.log(response);
        let token = response.slice(7);
        this.api.storeToken(token);
        console.log(this.account.getCart());
    }
    
}