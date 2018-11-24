import { OnInit, Component, HostListener, ViewChild, ElementRef } from "../../../../node_modules/@angular/core";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    @ViewChild('mainNav') mainNav: ElementRef;
    @ViewChild('personalHeader') personalHeader: ElementRef;
    fixedNav = false;

    constructor() { }
    ngOnInit() { }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        let pageY = window.pageYOffset;
        let navY = this.personalHeader.nativeElement.offsetHeight;

        if (pageY >= navY)
            this.fixedNav = true;
        else
            this.fixedNav = false;

    }
}