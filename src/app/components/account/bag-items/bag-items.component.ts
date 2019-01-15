import { OnInit, Component } from "@angular/core";
import { AccountService } from "src/app/services/account.service";

@Component({
    selector: 'bag-items',
    templateUrl: './bag-items.component.html',
    styleUrls: ['./bag-items.component.css']
})
export class BagItemsComponent implements OnInit {

    constructor(public account: AccountService) {}
    ngOnInit() {
        console.log(this.account.getCart());
    }
    
}