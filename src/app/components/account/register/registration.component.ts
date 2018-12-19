import { OnInit, Component, ReflectiveInjector } from "@angular/core";
import { AbstractControl, ValidatorFn } from '@angular/forms';


import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'registration',

    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

    public registerServerErrorMessage : String;

    constructor(private api: ApiService) {}

    async ngOnInit() {
        this.registerServerErrorMessage = '';
        let token = await  this.api.get("token/request-token");
        
        console.log(token);
    }

    async register(f){
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