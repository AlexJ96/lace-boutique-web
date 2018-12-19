import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(private api:ApiService) { }

  ngOnInit() {
    let token = this.api.getToken();
    if (token == null) {
      token = this.api.requestNewToken();
    }
  }
}
