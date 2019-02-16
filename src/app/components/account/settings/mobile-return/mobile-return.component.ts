import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'mobile-return',
    templateUrl: './mobile-return.component.html'
})
export class MobileReturnComponent implements OnInit {

    mobile: boolean = false;

    constructor(private route: Router) { }

    ngOnInit() {
        if (window.innerWidth < 768)
            this.mobile = true;
    }

    return() {
        this.route.navigateByUrl("account/settings");
    }

}