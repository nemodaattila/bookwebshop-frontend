import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LocalLibraryService} from "../../../services/book/local-library.service";
import {BookData} from "../../../models/bookData/book-data";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {BookCriteriaDataListFillerService} from "../../../services/book/book-criteria-data-list-filler.service";
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";
import {FormService} from "../../../services/helper/form.service";
import {GlobalMessageDisplayerService} from "../../../services/helper/global-message-displayer.service";
import {BookDataHandlerService} from "../../../services/book/book-data-handler.service";
import {BookUploadComponent} from "../book-upload/book-upload.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {BookDataComparator} from "../../../models/bookData/book-data-comparator";

@Component({
  selector: 'app-book-modifier',
  templateUrl: './book-modifier.component.html',
  styleUrls: ['./book-modifier.component.css']
})
export class BookModifierComponent extends BookUploadComponent implements OnInit, OnDestroy, AfterViewInit {

  book?: BookData;
  acrSubs: Subscription = Subscription.EMPTY
  libRefresh: Subscription = Subscription.EMPTY

  constructor(private localLibrary: LocalLibraryService, private acRoute: ActivatedRoute, private router: Router, protected dataListService: BookCriteriaDataListFillerService,
              public browserService: ComplexSearchBrowserService, protected formService: FormService,
              protected messageServ: GlobalMessageDisplayerService, protected bookHandlerServ: BookDataHandlerService
    , private domSanitizer: DomSanitizer,) {
    super(dataListService, browserService, formService, messageServ, bookHandlerServ)
  }

  ngOnInit(): void {
    this.acRoute.params.subscribe((params) => {
      let data = this.localLibrary.getAllDataByIsbn(params.isbn)
      if (!data) {
        this.libRefresh = this.localLibrary.libraryRefreshed.subscribe(() => {
          let data = this.localLibrary.getAllDataByIsbn(params.isbn)
          if (data!.success) {
            this.book = data!.data
            console.log(this.book)
            this.loadDataFromBook()
          }

        })
      }
      if (data?.success) {
        this.book = data!.data
        console.log(this.book)
        this.loadDataFromBook()
      } else {
        void this.router.navigate([''])

      }
    })

    this.dataListService.dataListEmitter.subscribe(value => {
      switch (this.activeDatalist) {
        case 0:
          this.authorDataList = value as string[]
          break
        case 1:
          this.publisherDataList = value as string[]
          break
        case 2:
          this.seriesDataList = value as string[]
          break
      }
    })
    this.initSelectOptions()

  }

  loadDataFromBook() {
    this.initFormGroup()
    this.checkTagBoxes()
    this.coverSource = this.domSanitizer.bypassSecurityTrustResourceUrl(this.book!.getCoverThumbnail()) as string
  }

  checkTagBoxes() {

    for (let key of this.book!.getTags()) {
      let e = document.getElementById("cb" + key);
      if (e) (e as HTMLInputElement)!.checked = true
    }
  }

  getConcatedAuthors() {
    return (Object.values(this.book?.getAuthor() as object).sort().join(','))
  }

  addThumbnailFromUrl() {
    super.addThumbnailFromUrl()
    this.dataForm['controls']['originalCoverDelete'].setValue(true)
  }

  addThumbnailFromFile(event: any) {
    super.addThumbnailFromFile(event)
    this.dataForm['controls']['originalCoverDelete'].setValue(true)

  }

  submit() {

    const formValid = this.formService.checkFormError(this.dataForm, this.formErrorMessages);
    if (formValid !== '') {
      this.messageServ.displayFail('BUFM', formValid)
      return;
    }
    const data = this.dataForm.value;

    console.log(data)
    let compData = this.compareNewDataWithOriginal(data)
    console.log(compData)
    if (Object.keys(compData).length > 2 || compData.originalCoverDelete) {

      this.bookHandlerServ.modifyBook(compData)
    }

  }

  compareNewDataWithOriginal(data: { [index: string]: any }) {
    let bc: BookDataComparator = new BookDataComparator();
    Object.assign(bc, this.book);
    return bc.compare(data)

  }

  ngOnDestroy(): void {
    this.acrSubs.unsubscribe()
    this.libRefresh.unsubscribe()
  }

  ngAfterViewInit(): void {
    console.log('afterview')
    this.checkTagBoxes()
  }

  removeBook() {
    this.bookHandlerServ.removeBook(this.book?.getIsbn())
  }

  protected initFormGroup(): void {
    this.dataForm = new FormGroup({
      title: new FormControl(this.book?.getTitle(), [Validators.required]),
      isbn: new FormControl(this.book?.getIsbn()),
      author: new FormControl(this.getConcatedAuthors()),
      type: new FormControl(this.book?.getTypeId()),
      category: new FormControl(this.book?.getCategoryId()),
      publisher: new FormControl(this.book?.getPublisher()),
      series: new FormControl(this.book?.getSeries()),
      targetAudience: new FormControl(this.book?.getTargetAudienceId()),
      language: new FormControl(this.book?.getLanguageID()),
      year: new FormControl(this.book?.getYear()),
      page: new FormControl(this.book?.getPageNumber()),
      format: new FormControl(this.book?.getFormat()),
      weight: new FormControl(this.book?.getWeight()),
      size: new FormControl(this.book?.getPhysicalSize()),
      description: new FormControl(this.book?.getDescription()),
      tags: new FormControl(this.book?.getTags().join(',')),
      price: new FormControl(this.book?.getPrice()),
      discount: new FormControl(this.book?.getDiscount()),
      discountType: new FormControl(this.book?.getDiscountTypeID()),
      coverUrl: new FormControl(),
      coverFile: new FormControl(),
      originalCoverDelete: new FormControl(false)
    });
  }
}

