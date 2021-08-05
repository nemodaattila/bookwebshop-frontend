import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LocalLibraryService} from "../../services/book/local-library.service";
import {BookData} from "../../models/bookData/book-data";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BookMetaDataService} from "../../services/book/book-meta-data.service";

@Component({
  selector: 'app-book-all-data-displayer',
  templateUrl: './book-all-data-displayer.component.html',
  styleUrls: ['./book-all-data-displayer.component.css']
})

/**
 * displays all data of a book (that is not 0/null/undefined)
 */
export class BookAllDataDisplayerComponent implements OnInit, OnDestroy {

  constructor(public metaService: BookMetaDataService, private sanitizer: DomSanitizer, private acRoute: ActivatedRoute, private router: Router, private localLibrary: LocalLibraryService) {
  }

  /**
   * isbn of the book
   * @private
   */
  private isbn: string = '';

  acrSubs: Subscription = Subscription.EMPTY;
  refreshSubs: Subscription = Subscription.EMPTY;

  /**
   * data of the book
   */
  public bookData!: BookData

  /**
   * safe string of the book cover
   */
  public safeImgURl?: SafeResourceUrl;

  /**
   * ids of authors in arra form
   */
  public authorIds: Array<number> = []

  /**
   * count of tags
   */
  public tagLength: number = 0;

  //TODO kedvezmény és kedvezménycsoport kiiratása

  ngOnInit(): void {
    this.acrSubs = this.acRoute.params.subscribe((value: Params) => {
      if (value['isbn'] !== undefined) {
        this.isbn = value['isbn']
        this.getBookData();
      }
    })
    this.refreshSubs = this.localLibrary.libraryRefreshed.subscribe(() => {
      this.getBookData();
    })
  }

  /**
   * gets the data of the book from locallibrary
   * if not secondary data exists for the book -> navigates to root
   * @private
   */
  private getBookData() {
    let data = this.localLibrary.getAllDataByIsbn(this.isbn)
    if (data !== undefined) {
      if (!data!.success) {
        void this.router.navigate([''])
      }
      if (!data.data!.primaryDataOnly()) {
        this.bookData = data.data as BookData
        this.fineData()
      }
    }
  }

  /**
   * refines data for display
   * @private
   */
  private fineData() {
    if (this.bookData?.getCover() !== undefined) {
      this.safeImgURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bookData.getCover());
    }
    if (this.bookData?.getAuthor() !== undefined) {
      const aIDs = Object.keys(this.bookData?.getAuthor())
      this.authorIds = aIDs.map(value => parseInt(value))
    }
    this.tagLength = this.bookData?.getTags().length as number
  }

  ngOnDestroy() {
    this.acrSubs.unsubscribe()
    this.refreshSubs.unsubscribe()
  }
}
