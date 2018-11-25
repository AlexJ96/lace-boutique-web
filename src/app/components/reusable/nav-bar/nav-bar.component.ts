import { OnInit, Component, HostListener, ViewChild, ElementRef } from "@angular/core";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

    @ViewChild('logo') logo: ElementRef;
    @ViewChild('deliveryNote') deliveryNote: ElementRef;
    fixedNav = false;

    constructor() { }
    ngOnInit() { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let pageY = window.pageYOffset;

        if (pageY >= 88)
            this.fixedNav = true;
        else
            this.fixedNav = false;

    }
}