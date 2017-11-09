import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JsonApiModule } from 'angular2-jsonapi';
import { Datastore } from './service/datastore.service';
import { ProductService } from './service/product.service';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    JsonApiModule
  ],
  providers: [
  ProductService,
  Datastore
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
