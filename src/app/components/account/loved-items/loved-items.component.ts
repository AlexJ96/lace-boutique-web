import { OnInit, Component, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: 'loved-items',
    templateUrl: './loved-items.component.html',
    styleUrls: ['./loved-items.component.css']
})
export class LovedItemsComponents implements OnInit {

    @ViewChild('shopSort') sortMenu: ElementRef;
    sortMenuOpen: boolean = false;

    constructor(private api: ApiService, public account: AccountService) {}
    ngOnInit() {
        console.log(this.account.getWishlist());
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