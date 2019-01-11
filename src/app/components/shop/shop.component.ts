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
    shownItemsAmount = 10;
    canLoadMoreItems = true;
    waysToSort = [{ Id: 0, Name: 'Price (Highest to Lowest)', checked: false }, { Id: 1, Name: 'Price (Lowest to Highest)', checked: false }, { Id: 2, Name: 'Newest to Oldest', checked: false }, { Id: 3, Name: 'Oldest to Newest', checked: false }];
    itemsPerPage = [{ Id: 0, Name: '25', checked: false, Amount: 25 }, { Id: 1, Name: '50', checked: false, Amount: 50 }, { Id: 2, Name: '100', checked: false, Amount: 100 }, { Id: 3, Name: 'All', checked: false, Amount: -1 }];
    currentPage = 2;
    totalPages = 1;

    filter = {
        Brand: '',
        Colour: '',
        Size: '',
        Category: 'Dresses',
        CurrentPage: this.currentPage,
        Count: this.shownItemsAmount
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
        this.filters = await this.shopService.loadFilters(this.filter, ["Shop"]);
        console.log(this.filters);
        this.filters.SIZE_FILTERS.forEach(element => {
            element.checked = false;
        });
        this.filters.COLOUR_FILTERS.forEach(element => {
            element.checked = false;
        });

        this.items = await this.shopService.loadItemsByFilter(this.filter, ["Shop"]);
        this.refreshPageCount();
    }

    refreshPageCount() {
        this.totalPages = Math.round(this.filters.TOTAL_COUNT[0].keyCount / this.shownItemsAmount);
    }

    pageDown() {
        if (this.currentPage <= 1) {
            return;
        }
        this.currentPage--;
    }

    pageUp() {
        if (this.currentPage == this.totalPages)
            return;
        this.currentPage++;
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

        if (this.filter.Colour == "" && this.filter.Size == "")
            return;
        this.items = await this.shopService.loadItemsByFilter(this.filter, ["Shop"]);
        this.filters.TOTAL_COUNT[0].keyCount = this.items.length;
        this.displayFilterMenu();
        this.refreshPageCount();
    }

    async clearFilters() {
        this.filter.Colour = '';
        this.filter.Size = '';

        this.filters.SIZE_FILTERS.forEach(element => {
            if (element.checked) {
                element.checked = false;
            }
        });

        this.filters.COLOUR_FILTERS.forEach(element => {
            if (element.checked) {
                element.checked = false;
            }
        });
        this.items = await this.shopService.loadItemsByFilter(this.filter, ["Shop"]);
        this.filters = await this.shopService.loadFilters(this.filter, ["Shop"]);
        this.displayFilterMenu();
        this.refreshPageCount();
    }

    displayFilterMenu() {
        let displayType = this.filterMenu.nativeElement.style.display;

        this.coloursFilterOpen = false;
        this.sizesFilterOpen = false;

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
        this.coloursFilterOpen = false;
    }

    displayColoursMenu() {
        this.coloursFilterOpen = !this.coloursFilterOpen;
        this.sizesFilterOpen = false;
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

    orderBy(selected) {
        this.waysToSort.forEach(element => {
            if (element.Name != selected.Name)
                element.checked = false;
        });
        selected.checked = true;
        //TODO API call for ordering
    }

    selectItemsPerPage(amount) {
        this.itemsPerPage.forEach(element => {
            if (element.Name != amount.Name)
                element.checked = false;
        });
        amount.checked = true;
        this.shownItemsAmount = amount.Amount;
        this.itemAmtTwoMenuOpen = false;
        this.itemAmtMenuOpen = false;
        //TODO API call for amount / pagination
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
        if (!this.canLoadMoreItems)
            return;

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
        if (this.shownItemsAmount < 0) {
            this.canLoadMoreItems = false;
            return "All";
        }

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