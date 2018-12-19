import { OnInit, Component, HostListener, ViewChild, ElementRef } from "@angular/core";
import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    @ViewChild('siteNav') siteNav: ElementRef;
    @ViewChild('userNav') userNav: ElementRef;
    @ViewChild('lovedItems') lovedItems: ElementRef;
    @ViewChild('bagItems') bagItems: ElementRef;

    fixedNav: boolean = false;
    lovedItemsShowing: boolean = false;
    bagItemsShowing: boolean = false;

    constructor(private api:ApiService) { }
    ngOnInit() { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let pageHeight = window.pageYOffset;
        let defaultMargin = 78;
        let defaultLovedMargin = 132.5;

        if (pageHeight >= 78) {
            this.siteNav.nativeElement.style.marginTop = 0;
            this.userNav.nativeElement.style.display = 'inline';
            this.fixedNav = true;

            if (this.lovedItemsShowing == true)
                this.lovedItems.nativeElement.style.top = '54.5px';

            if (this.bagItemsShowing == true)
                this.bagItems.nativeElement.style.top = '54.5px';
        } else {
            let marginTop = defaultMargin - pageHeight;
            this.siteNav.nativeElement.style.marginTop = marginTop + 'px';
            this.userNav.nativeElement.style.display = 'none';
            this.fixedNav = false;

            let lovedBagTop = defaultLovedMargin - pageHeight;
            if (this.lovedItemsShowing == true) {
                this.lovedItems.nativeElement.style.top = lovedBagTop + 'px';
            } else if (this.bagItemsShowing == true) {
                this.bagItems.nativeElement.style.top = lovedBagTop + 'px';
            }

        }
    }

    toggleLovedItems() {
        let displayType = this.lovedItems.nativeElement.style.display;
        if (displayType == 'none' || displayType == '') {
            if (this.fixedNav == false) {
                this.lovedItems.nativeElement.style.top = '132.5px';
            } else {
                this.lovedItems.nativeElement.style.top = '54.5px';
            }
            this.lovedItems.nativeElement.style.display = 'block';
            this.lovedItemsShowing = true;
            this.bagItemsShowing = false;
            this.bagItems.nativeElement.style.display = 'none';
        } else {
            this.lovedItems.nativeElement.style.display = 'none';
            this.lovedItemsShowing = false;
        }
    }

    mouseEnterBag() {
        if (this.fixedNav == false) {
            this.bagItems.nativeElement.style.top = '132.5px';
        } else {
            this.bagItems.nativeElement.style.top = '54.5px';
        }
        this.bagItems.nativeElement.style.display = 'block';
        this.bagItemsShowing = true;
    }

    mouseLeaveBag() {
        this.bagItems.nativeElement.style.display = 'none';
        this.bagItemsShowing = false;
    }

    mouseEnterLoved() {
        if (this.fixedNav == false) {
            this.lovedItems.nativeElement.style.top = '132.5px';
        } else {
            this.lovedItems.nativeElement.style.top = '54.5px';
        }
        this.lovedItems.nativeElement.style.display = 'block';
        this.lovedItemsShowing = true;
    }

    mouseLeaveLoved() {
        this.lovedItems.nativeElement.style.display = 'none';
        this.lovedItemsShowing = false;
    }


    test() {
        console.log(this.api.getToken());
    }
}