import { OnInit, Component } from "@angular/core";
import { Item } from "../../../models/item";

@Component({
    selector: 'shop-item',
    templateUrl: './shop-item.component.html',
    styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit{

    item = new Item();

    constructor() {}
    ngOnInit() {}

}