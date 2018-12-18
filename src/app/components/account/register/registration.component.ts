import { OnInit, Component, ReflectiveInjector } from "@angular/core";
import { NgForm } from '@angular/forms';

import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'registration',

    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
    constructor(private api: ApiService) {}
    async ngOnInit() {
        let token = await  this.api.get("token/request-token");
        localStorage.setItem("lbt", token);
    }

    async register(f){
        let data = f.value;
        let res = await this.api.post("account/register", data);
        console.log(res);
    	
    }

}