import { OnInit, Component, ReflectiveInjector } from "@angular/core";

import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'account-overview',
    templateUrl: './account-overview.component.html',
    styleUrls: ['./account-overview.component.css']
})

export class AccountOverviewComponent implements OnInit {

    name:String = "";

    constructor(private api: ApiService) {}

    ngOnInit() {}

    // async register(f){
    //     let data = f.value;
    //     let res = await this.api.post("account/register", data);
    //     if (res !== 'Done'){
    //         this.registerServerErrorMessage = res;
    //     }
    	
    // }

    // get registerServerErrorMsg(){
    //     return this.registerServerErrorMessage;
    // }


}