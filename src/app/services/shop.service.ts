import { Injectable } from "@angular/core";
import { Item } from "../models/item";
import { ApiService } from "./api.service";

@Injectable()
export class ShopService {

    shopItems: Array<Item> = new Array<Item>();

    constructor(private api: ApiService) {}

    async loadItems() {
        let itemsFromApi = await this.api.get("shop/all-items");
        itemsFromApi.forEach(element => {
            let item = new Item();
            Object.assign(item, element);
            this.shopItems.push(item);
        });
    }

    async loadItemsByBrand(brand: String) {
        let itemsFromApi = await this.api.post("shop/all-items-brand", { Brand: brand });
        console.log(itemsFromApi);
    }

    async loadItemsByColour(colour: String) {
        let itemsFromApi = await this.api.post("shop/all-items-colour", { Colour: colour });
        console.log(itemsFromApi);
    }

    async loadItemsByFilter(filter: any) {
        let itemsFromApi = await this.api.post("shop/items-by-filter", filter);
        console.log(itemsFromApi);
    }

    getShopItems() {
        return this.shopItems;
    }
}