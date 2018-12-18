import { OnInit, Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	constructor(private api: ApiService) {}
    async ngOnInit() {
        let token = await  this.api.get("token/request-token");
        localStorage.setItem("lbt", token);
    }

    async login(f){
        let data = f.value;
        let res = await this.api.post("account/login", data);
        console.log(res);
    	
    }
    
}