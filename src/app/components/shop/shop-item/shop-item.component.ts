import { OnInit, Component } from "@angular/core";
import { Item } from "../../../models/item";
import { ShopService } from "../../../services/shop.service";

@Component({
    selector: 'shop-item',
    templateUrl: './shop-item.component.html',
    styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit{

    item: Item;

    constructor(private shop: ShopService) {}
    ngOnInit() {
        this.loadItem();
    }

    async loadItem() {
        await this.shop.loadItems();
        this.item = this.shop.getShopItems()[0];
        console.log(this.shop.getShopItems());
    }

}