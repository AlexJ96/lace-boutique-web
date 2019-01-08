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
    
    async loadFilters(filter: any) {
        return this.api.post("shop/getFilters", filter);
    }

    async loadItemsByFilter(filter: any) {
        return this.api.post("shop/getItems", filter);
        //console.log(itemsFromApi);
        //console.log(itemsFromApi.TOTAL_COUNT[0].keyCount);
    }

    getShopItems() {
        return this.shopItems;
    }
}