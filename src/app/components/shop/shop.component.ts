import { OnInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Item } from "../../models/item";
import { ApiService } from "../../services/api.service";
import { ShopService } from "../../services/shop.service";

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    @ViewChild('shopFilter') filterMenu: ElementRef;
    filterMenuOpen: boolean = false;

    @ViewChild('shopSort') sortMenu: ElementRef;
    sortMenuOpen: boolean = false;

    @ViewChild('itemAmt') itemMenu: ElementRef;
    itemAmtMenuOpen: boolean = false;

    @ViewChild('itemAmtTwo') itemMenuTwo: ElementRef;
    itemAmtTwoMenuOpen: boolean = false;

    filters: any;
    sizesFilterOpen: boolean = false;
    coloursFilterOpen: boolean = false;
    items: any;
    shownItemsAmount = 25;
    canLoadMoreItems = true;
        
    filter = {
        Brand: '',
        Colour: '',
        Size: '',
        Category: 'Dresses'
    }

    constructor(private route: ActivatedRoute, private api: ApiService, private shopService: ShopService) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['id'] != null) {
                console.log(params['id']);
            }
        });
        this.loadShopItems();
    }

    async loadShopItems() {
        this.filters = await this.shopService.loadFilters(this.filter);
        console.log(this.filters);
        this.filters.SIZE_FILTERS.forEach(element => {
            element.checked = false;
        });
        this.filters.COLOUR_FILTERS.forEach(element => {
            element.checked = false;
        });

        this.items = await this.shopService.loadItemsByFilter(this.filter);
    }

    async applyFilters() {
        let sizeFilters = "";
        let colourFilters = "";

        this.filters.SIZE_FILTERS.forEach(element => {
            if (element.checked) {
                sizeFilters += element.key + ",";
            }
        });

        this.filters.COLOUR_FILTERS.forEach(element => {
            if (element.checked) {
                colourFilters += element.key + ",";
            }
        });

        this.filter.Colour = colourFilters;
        this.filter.Size = sizeFilters;

        this.items = await this.shopService.loadItemsByFilter(this.filter);
    }

    displayFilterMenu() {
        let displayType = this.filterMenu.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.filterMenu.nativeElement.style.display = 'block';
            this.filterMenuOpen = true;
        } else {
            this.filterMenu.nativeElement.style.display = 'none';
            this.filterMenuOpen = false;
        }
    }

    displaySizesMenu() {
        this.sizesFilterOpen = !this.sizesFilterOpen;
    }

    displayColoursMenu() {
        this.coloursFilterOpen = !this.coloursFilterOpen;
    }

    displaySortMenu() {
        let displayType = this.sortMenu.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.sortMenu.nativeElement.style.display = 'block';
            this.sortMenuOpen = true;
        } else {
            this.sortMenu.nativeElement.style.display = 'none';
            this.sortMenuOpen = false;
        }
    }

    displayItemAmountMenu() {
        if (!this.canLoadMoreItems)
            return;
            
        let displayType = this.itemMenu.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.itemMenu.nativeElement.style.display = 'block';
            this.itemAmtMenuOpen = true;
        } else {
            this.itemMenu.nativeElement.style.display = 'none';
            this.itemAmtMenuOpen = false;
        }
    }

    displayItemAmountTwoMenu() {
        let displayType = this.itemMenuTwo.nativeElement.style.display;

        if (displayType == 'none' || displayType == "") {
            this.itemMenuTwo.nativeElement.style.display = 'block';
            this.itemAmtTwoMenuOpen = true;
        } else {
            this.itemMenuTwo.nativeElement.style.display = 'none';
            this.itemAmtTwoMenuOpen = false;
        }
    }

    getProductsAmount() {
        if (this.filters != undefined) {
            let total = this.filters.TOTAL_COUNT[0].keyCount;
            return "(" + total + (total > 1 ? " Products" : " Product") + ")";
        } else {
            return "(0 Products)";
        }
    }

    getCurrentShownItemsAmount() {
        if (this.filters != undefined) {
            let total = this.filters.TOTAL_COUNT[0].keyCount;
            if (total < this.shownItemsAmount) {
                this.canLoadMoreItems = false;
                return "All";
            } else {
                this.canLoadMoreItems = true;
                return this.shownItemsAmount;
            }
        } else {
            this.canLoadMoreItems = true;
            return this.shownItemsAmount;
        }
    }

    scrollToTop() {
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 8);
    }


}