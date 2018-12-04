import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/reusable/nav-bar/nav-bar.component';
import { FooterComponent } from './components/reusable/footer/footer.component';
import { ShopComponent } from './components/shop/shop.component';
import { LovedItemsComponents } from './components/account/loved-items/loved-items.component';
import { BagItemsComponent } from './components/account/bag-items/bag-items.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'shop/category/:id', component: ShopComponent },
  { path: 'wishlist', component: LovedItemsComponents },
  { path: 'cart', component: BagItemsComponent }

  // TODO
  /*{ path: '404', component: ErrorNotFoundComponent },
  { path: 'unauthorised', component: ErrorUnauthorisedComponent },
  { path: '**', component: ErrorNotFoundComponent }*/
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    ShopComponent,
    LovedItemsComponents,
    BagItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false },
    ),
  ],
  exports: [RouterModule],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
