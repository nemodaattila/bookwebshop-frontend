

import { AppComponent } from './app.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { BrowseComponent } from './components/browse/browse.component';
import {AppRoutingModule} from "./approuting/app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { BookThemeCategoryBrowserComponent } from './components/categoryBrowser/book-theme-category-browser/book-theme-category-browser.component';
import { BookPrimaryDataDisplayerComponent } from './components/bookPrimaryDataDisplayer/book-primary-data-displayer/book-primary-data-displayer.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { IndividualBookPrimaryDataDisplayerComponent } from './components/bookPrimaryDataDisplayer/individual-book-primary-data-displayer/individual-book-primary-data-displayer.component';
import { MainCategoryBrowserComponent } from './components/categoryBrowser/main-category-browser/main-category-browser.component';
import { SubCategoryBrowserComponent } from './components/categoryBrowser/sub-category-browser/sub-category-browser.component';
import { PageNavigatorComponent } from './components/page-navigator/page-navigator.component';
import { SearchOrderAndCountHandlerComponent } from './components/search-order-and-count-handler/search-order-and-count-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    BrowseComponent,
    BookThemeCategoryBrowserComponent,
    BookPrimaryDataDisplayerComponent,
    IndividualBookPrimaryDataDisplayerComponent,
    MainCategoryBrowserComponent,
    SubCategoryBrowserComponent,
    PageNavigatorComponent,
    SearchOrderAndCountHandlerComponent,
  ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        RouterModule,
        CommonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
