import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {BrowseComponent} from "../browse/browse.component";

const routes: Routes = [
  {path: 'browse', component: BrowseComponent },
  {path: '', redirectTo: '/browse', pathMatch: 'full'},
  {path: '**', redirectTo: '/browse', pathMatch: 'full'}
  // {path: 'register', component: UserregisterComponent},
  // {path: 'login', component: UserloginComponent},
  // {path: 'profil', component: ProfilComponent, canActivate: [AuthenticationUserGuard]},
  // {path: 'profiledit', component: ProfileditComponent, canActivate: [AuthenticationUserGuard]},
  // {path: 'userdelete', component: UserdeleteComponent, canActivate: [AuthenticationUserGuard]},
  // {path: 'ownedposts', component: OwnedEntriesComponent, canActivate: [AuthenticationUserGuard]},
  // {path: 'entryeditor/:id', component: EntryeditorComponent, canActivate: [AuthenticationUserGuard]},
  // {path: 'moderateentry/:id', component: EntrymoderatorComponent, canActivate: [AuthenticationAdminGuard]},
  // {path: 'howtouse', component: HowtouseComponent},
  // {path: '', redirectTo: '/guestbook', pathMatch: 'full'},
  // {path: '**', redirectTo: '/guestbook', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class ApproutingModule { }
