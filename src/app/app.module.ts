import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { BrowseComponent } from './components/browse/browse.component';
import {RouterModule} from "@angular/router";
import {ApproutingModule} from "./approuting/approuting.module";
import {HttpClientModule} from "@angular/common/http";
import { BookThemeCategoryBrowserComponent } from './components/categoryBrowser/book-theme-category-browser/book-theme-category-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    BrowseComponent,
    BookThemeCategoryBrowserComponent
  ],
    imports: [
        ApproutingModule,
        HttpClientModule,
        BrowserModule,
        RouterModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
