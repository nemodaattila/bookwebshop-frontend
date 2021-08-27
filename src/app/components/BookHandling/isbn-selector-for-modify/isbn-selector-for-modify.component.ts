import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalLibraryService} from "../../../services/book/local-library.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-isbn-selector-for-modify',
  templateUrl: './isbn-selector-for-modify.component.html',
  styleUrls: ['./isbn-selector-for-modify.component.css']
})
export class IsbnSelectorForModifyComponent implements OnInit, OnDestroy {

  constructor(private localLibrary: LocalLibraryService, private router: Router) {
  }

  ngOnDestroy(): void {
    this.refreshSubs.unsubscribe()
  }

  ngOnInit(): void {
  }

  refreshSubs: Subscription = Subscription.EMPTY

  isbn: string = ''

  onClick() {
    if (this.isbn.length > 3) {
      let exists = this.localLibrary.checkIsbnInLocalLibrary(this.isbn)
      if (exists) {
        void this.router.navigate(['bookmodify', this.isbn])
      } else {
        this.refreshSubs = this.localLibrary.libraryRefreshed.subscribe(() => {
          void this.router.navigate(['bookmodify', this.isbn])
        })
      }
    }
  }

}
