import { OnInit, Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { ApiService } from "../../../services/api.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    public registerServerErrorMessage : String;

	constructor(private api: ApiService) {}
    async ngOnInit() {
        this.registerServerErrorMessage = '';
    }

    async login(f){
        let data = f.value;
        console.log(data);
        let res = await this.api.post("account/login", data);
        if (res !== 'Done'){
            this.registerServerErrorMessage = res;
        }
    }

    get registerServerErrorMsg(){
        return this.registerServerErrorMessage;
    }
    
}