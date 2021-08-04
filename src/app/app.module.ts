import {AppComponent} from './app.component';
import {MainMenuComponent} from './components/navigationMenu/mainmenu/main-menu.component';
import {BrowseComponent} from './components/browse/browse.component';
import {AppRoutingModule} from "./approuting/app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BookThemeCategoryBrowserComponent} from './components/categoryBrowser/book-theme-category-browser/book-theme-category-browser.component';
import {BookPrimaryDataDisplayerComponent} from './components/bookPrimaryDataDisplayer/book-primary-data-displayer/book-primary-data-displayer.component';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IndividualBookPrimaryDataDisplayerComponent} from './components/bookPrimaryDataDisplayer/individual-book-primary-data-displayer/individual-book-primary-data-displayer.component';
import {MainCategoryBrowserComponent} from './components/categoryBrowser/main-category-browser/main-category-browser.component';
import {SubCategoryBrowserComponent} from './components/categoryBrowser/sub-category-browser/sub-category-browser.component';
import {PageNavigatorComponent} from './components/page-navigator/page-navigator.component';
import {SearchOrderAndCountHandlerComponent} from './components/search-order-and-count-handler/search-order-and-count-handler.component';
import {DetailedSearchComponent} from './components/detailed-search/detailed-search.component';
import {ComplexSearchBrowserComponent} from './components/complexSearchBrowser/complex-search-browser/complex-search-browser.component';
import {CriteriaSelectorComponent} from './components/complexSearchBrowser/criteria-selector/criteria-selector.component';
import {CriteriaSelectElementComponent} from './components/complexSearchBrowser/criteria-select-element/criteria-select-element.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CriteriaInputTextComponent} from './components/complexSearchBrowser/criteria-input-text/criteria-input-text.component';
import {CriteriaInputTextWithDataListComponent} from './components/complexSearchBrowser/criteria-input-text-with-data-list/criteria-input-text-with-data-list.component';
import {CriteriaSelectWithOptionGroupComponent} from './components/complexSearchBrowser/criteria-select-with-option-group/criteria-select-with-option-group.component';
import {CriteriaInputNumberComponent} from './components/complexSearchBrowser/criteria-input-number/criteria-input-number.component';
import {CriteriaSelectInputComponent} from './components/complexSearchBrowser/criteria-select-input/criteria-select-input.component';
import {CriteriaMultipleCheckBoxComponent} from './components/complexSearchBrowser/criteria-multiple-check-box/criteria-multiple-check-box.component';
import {LoginFormComponent} from './components/navigationMenu/login-form/login-form.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoggedInMenuComponent} from './components/navigationMenu/logged-in-menu/logged-in-menu.component';
import {HttpAuthenticationInterceptor} from "./services/authentication/http-authentication.interceptor";
import {GlobalMessageDisplayerComponent} from './components/global-message-diplayer/global-message-displayer.component';
import {BookAllDataDisplayerComponent} from './components/book-all-data-displayer/book-all-data-displayer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    BrowseComponent,
    BookThemeCategoryBrowserComponent,
    BookPrimaryDataDisplayerComponent,
    IndividualBookPrimaryDataDisplayerComponent,
    MainCategoryBrowserComponent,
    SubCategoryBrowserComponent,
    PageNavigatorComponent,
    SearchOrderAndCountHandlerComponent,
    DetailedSearchComponent,
    ComplexSearchBrowserComponent,
    CriteriaSelectorComponent,
    CriteriaSelectElementComponent,
    CriteriaInputTextComponent,
    CriteriaInputTextWithDataListComponent,
    CriteriaSelectWithOptionGroupComponent,
    CriteriaInputNumberComponent,
    CriteriaSelectInputComponent,
    CriteriaMultipleCheckBoxComponent,
    LoginFormComponent,
    RegistrationComponent,
    LoggedInMenuComponent,
    GlobalMessageDisplayerComponent,
    BookAllDataDisplayerComponent,

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpAuthenticationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
