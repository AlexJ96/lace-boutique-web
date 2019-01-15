import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable()
export class AccountService {

    constructor(private api: ApiService) { }

    getAccount() {
        let token = this.api.getToken();
        if (!token)
            return null;

        if (!token.info)
            return null;

        return !token.info.account ? null : token.info.account;
    }
    
    getWishlist() {
        let token = this.api.getToken();
        if (!token)
            return null;

        if (!token.info)
            return null;

        return !token.info.wishlist ? null : token.info.wishlist;
    }

    getCart() {
        let token = this.api.getToken();
        if (!token)
            return null;

        if (!token.info)
            return null;

        return !token.info.cart ? null : token.info.cart;
    }
}
