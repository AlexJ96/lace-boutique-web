import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private api: ApiService) { }

  async ngOnInit() {
    let token = this.api.getToken();

    if (token == null) {
      await this.api.requestNewToken();
      token = this.api.getToken();
    } else { 
      let expiry = token.exp;
      let current = Date.now() / 1000;
      if (expiry < current) {
        await this.api.refreshToken();
        token = this.api.getToken();
      }
    }
    console.log(token);
  }

}
