

import { AppComponent } from './app.component';
import { MainmenuComponent } from './components/mainmenu/mainmenu.component';
import { BrowseComponent } from './components/browse/browse.component';
import {ApproutingModule} from "./approuting/approuting.module";
import {HttpClientModule} from "@angular/common/http";
import { BookThemeCategoryBrowserComponent } from './components/categoryBrowser/book-theme-category-browser/book-theme-category-browser.component';
import { BookPrimaryDataDisplayerComponent } from './components/bookPrimaryDataDisplayer/book-primary-data-displayer/book-primary-data-displayer.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import { InduvidualBookPrimaryDataDisplayerComponent } from './components/bookPrimaryDataDisplayer/induvidual-book-primary-data-displayer/induvidual-book-primary-data-displayer.component';
import { MainCategoryBrowserComponent } from './components/categoryBrowser/main-category-browser/main-category-browser.component';
import { SubCategoryBrowserComponent } from './components/categoryBrowser/sub-category-browser/sub-category-browser.component';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    BrowseComponent,
    BookThemeCategoryBrowserComponent,
    BookPrimaryDataDisplayerComponent,
    InduvidualBookPrimaryDataDisplayerComponent,
    MainCategoryBrowserComponent,
    SubCategoryBrowserComponent
  ],
    imports: [
        ApproutingModule,
        HttpClientModule,
        BrowserModule,
        RouterModule,
        CommonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
