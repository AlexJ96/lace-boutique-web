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
import { ShopItemComponent } from './components/shop/shop-item/shop-item.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegistrationComponent } from './components/account/register/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopService } from "./services/shop.service";
import { BlockerService } from './services/blocker.service';
import { BlockerDirective } from './directives/blocker.directive';
import { AccountService } from './services/account.service';
import { HoldingComponent } from './components/holding/holding.component';
import { AccountSettingsComponent } from './components/account/settings/account-settings.component';
import { AccountOverviewComponent } from './components/account/settings/overview/account-overview.component';
import { MobileReturnComponent } from './components/account/settings/mobile-return/mobile-return.component';
import { AccountAddressComponent } from './components/account/settings/address/account-address.component';
import { AccountContactComponent } from './components/account/settings/contact/account-contact.component';
import { AccountDetailsComponent } from './components/account/settings/details/account-details.component';
import { AccountHelpComponent } from './components/account/settings/help/account-help.component';
import { AccountOrdersComponent } from './components/account/settings/orders/account-orders.component';
import { AccountWhereOrderComponent } from './components/account/settings/where-order/account-where-order.component';
import { AccountReturnComponent } from './components/account/settings/return/account-return.component';

const routes: Routes = [

  // { path: '**', component: HoldingComponent }

  { path: '', component: HomeComponent },
  { path: 'shop', children: [
    { path: 'category/:id', component: ShopComponent },
    { path: 'item/:id', component: ShopItemComponent }
  ]},
  { path: 'account', children: [ 
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'wishlist', component: LovedItemsComponents },
    { path: 'cart', component: BagItemsComponent },
    { path: 'settings', component: AccountSettingsComponent },
    { path: 'settings/overview', component: AccountOverviewComponent },
    { path: 'settings/orders', component: AccountOrdersComponent },
    { path: 'settings/details', component: AccountDetailsComponent },
    { path: 'settings/address', component: AccountAddressComponent },
    { path: 'settings/contact', component: AccountContactComponent },
    { path: 'settings/help', component: AccountHelpComponent },
    { path: 'settings/where-order', component: AccountWhereOrderComponent },
    { path: 'settings/return', component: AccountReturnComponent },
  ]}

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
    ShopItemComponent,
    LovedItemsComponents,
    BagItemsComponent,
    LoginComponent,
    RegistrationComponent,
    AccountSettingsComponent,
    BlockerDirective,
    HoldingComponent,
    AccountOverviewComponent,
    MobileReturnComponent,
    AccountAddressComponent,
    AccountContactComponent,
    AccountDetailsComponent,
    AccountHelpComponent,
    AccountOrdersComponent,
    AccountWhereOrderComponent,
    AccountReturnComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false },
    ),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
  providers: [ApiService, ShopService, BlockerService, AccountService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
