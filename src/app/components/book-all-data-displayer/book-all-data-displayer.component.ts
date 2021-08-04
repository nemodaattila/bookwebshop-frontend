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
export class BookAllDataDisplayerComponent implements OnInit, OnDestroy {

  constructor(private metaService: BookMetaDataService, private sanitizer: DomSanitizer, private acRoute: ActivatedRoute, private router: Router, private localLibrary: LocalLibraryService) {
  }

  private isbn: string = '';

  acrSubs: Subscription = Subscription.EMPTY;
  refreshSubs: Subscription = Subscription.EMPTY;

  public bookData?: BookData

  public safeImgURl?: SafeResourceUrl;

  public authorIds: Array<number> = []

  public typeString?: string

  labelList = {
    "OPrice": "Ár",
    "Discount": "Kedvezmény",
    "DPrice": "Kedvezményes Ár",
    "Author": "Iró",
    "Title": "Cím",
    "ISBN": "ISBN",
    "Series": "Sorozat",
    "Type": "Típus",
    "Category": "Kategória",
    "Page": "Oldalak száma",
    "Publisher": "Kiadó",
    "Year": "Kiadás éve",
    "Language": "Nyelv",
    "Targetaudience": "Célcsoport",
    "Format": "Formátum",
    "Weight": "Súly",
    "Size": "Méret",
    "Tags": "Cimkék",
    "ShortDesc": "Leírás"
  };

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

  private getBookData() {
    let data = this.localLibrary.getAllDataByIsbn(this.isbn)
    console.log(data)
    if (data !== undefined) {
      if (!data!.success) {
        console.log('not exists')
        void this.router.navigate([''])
      }
      if (!data.data?.primaryDataOnly()) {
        this.bookData = data.data
        this.fineData()
      }
    }
  }

  private fineData() {
    if (this.bookData?.getCover() !== undefined) {
      this.safeImgURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bookData.getCover());
    }
    if (this.bookData?.getAuthor() !== undefined) {
      const aIDs = Object.keys(this.bookData?.getAuthor())
      this.authorIds = aIDs.map(value => parseInt(value))
    }
    if (this.bookData?.getTypeId() !== undefined) {
      this.typeString = this.metaService.getTypeById(this.bookData.getTypeId())
    }
  }

  ngOnDestroy() {
    this.acrSubs.unsubscribe()
    this.refreshSubs.unsubscribe()
  }

}
