import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import { BrowseComponent } from './browse/browse.component';
import {RouterModule} from "@angular/router";
import {ApproutingModule} from "./approuting/approuting.module";

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    BrowseComponent
  ],
    imports: [
        ApproutingModule,
        BrowserModule,
        RouterModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
