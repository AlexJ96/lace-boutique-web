import { OnInit, Component, ElementRef, ViewChild } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Item } from "../../models/item";

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

    tests = ["", "", "", "", "", ""];

    item = new Item();

    constructor(private route: ActivatedRoute) { }
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            if (params['id'] != null) {
                console.log(params['id']);
            }
        });
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