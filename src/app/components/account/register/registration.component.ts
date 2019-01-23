import { OnInit, Component, ReflectiveInjector } from "@angular/core";

import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'registration',

    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

    public registerServerErrorMessage : String;
    register = {};

    constructor(private api: ApiService) {}

    async ngOnInit() {
        this.registerServerErrorMessage = '';
    }

    async registerUser(f){
        let data = f.value;
        let res = await this.api.post("account/register", data);
        if (res !== 'Done'){
            this.registerServerErrorMessage = res;
        }
    	
    }

    get registerServerErrorMsg(){
        return this.registerServerErrorMessage;
    }


}