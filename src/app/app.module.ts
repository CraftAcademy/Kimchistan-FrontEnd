import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {JsonApiModule} from 'angular2-jsonapi';
import {DatastoreService} from './service/datastore.service';
import {ProductService} from './service/product.service';
import {ShoppingCartService} from './service/shoppingcart.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {CartComponent} from './cart/cart.component';
import { IndexComponent } from './index/index.component';

const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'cart', component: CartComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    IndexComponent,

  ],
  imports: [
    BrowserModule,
    JsonApiModule,
    NgbModule.forRoot(), // for root module
    // NgbModule // for child module
    JsonApiModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_hlbV07PdNuEsXI13JQkTNLp2rp5kWos'
    })
  ],
  providers: [
    ProductService,
    DatastoreService,
    ShoppingCartService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
