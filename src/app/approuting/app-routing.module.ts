import {BrowseComponent} from "../components/browse/browse.component";
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {DetailedSearchComponent} from "../components/detailed-search/detailed-search.component";
import {RegistrationComponent} from "../components/registration/registration.component";
import {AuthenticationNotLoggedGuard} from "../services/authentication/authentication-not-logged.guard";
import {BookAllDataDisplayerComponent} from "../components/book-all-data-displayer/book-all-data-displayer.component";
import {BookUploadComponent} from "../components/BookHandling/book-upload/book-upload.component";
import {DataMaintainerGuard} from "../services/authentication/data-maintainer.guard";
import {IsbnSelectorForModifyComponent} from "../components/BookHandling/isbn-selector-for-modify/isbn-selector-for-modify.component";
import {BookModifierComponent} from "../components/BookHandling/book-modifier/book-modifier.component";

/**
 * routing Path
 */
const routes: Routes = [
  {path: 'isbnselformod', component: IsbnSelectorForModifyComponent, canActivate: [DataMaintainerGuard]},
  {path: 'bookmodify/:isbn', component: BookModifierComponent, canActivate: [DataMaintainerGuard]},
  {path: 'bookupload', component: BookUploadComponent, canActivate: [DataMaintainerGuard]},
  {path: 'bookalldata/:isbn', component: BookAllDataDisplayerComponent, pathMatch: 'full'},
  {path: 'register', component: RegistrationComponent, canActivate: [AuthenticationNotLoggedGuard]},
  {path: 'browse/newreleases', component: BrowseComponent},
  {path: 'browse/:quick', component: BrowseComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'detailedSearch', component: DetailedSearchComponent},
  {path: '', redirectTo: '/browse', pathMatch: 'full'},
  {path: '**', redirectTo: '/browse', pathMatch: 'full'},

  /*
  {path: 'profil', component: ProfilComponent, canActivate: [AuthenticationUserGuard]},
  {path: 'profiledit', component: ProfileditComponent, canActivate: [AuthenticationUserGuard]},
  {path: 'userdelete', component: UserdeleteComponent, canActivate: [AuthenticationUserGuard]},
  {path: 'ownedposts', component: OwnedEntriesComponent, canActivate: [AuthenticationUserGuard]},
  {path: 'entryeditor/:id', component: EntryeditorComponent, canActivate: [AuthenticationUserGuard]},
  {path: 'moderateentry/:id', component: EntrymoderatorComponent, canActivate: [AuthenticationAdminGuard]},
  {path: 'howtouse', component: HowtouseComponent},
   */
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
