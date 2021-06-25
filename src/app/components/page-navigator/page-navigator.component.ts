import {Component, Injector, Input, OnInit} from '@angular/core';
import {BookSearchService} from "../../services/book-search.service";
import {Subject, Subscription} from "rxjs";
import {PageNavigatorModel} from "../../models/page-navigator-model";

@Component({
  selector: 'app-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: ['./page-navigator.component.css']
})
export class PageNavigatorComponent implements OnInit {

  public navModel: PageNavigatorModel
  private bookSearchParamRequest = Subscription.EMPTY
  private actualIsbnListSubscription: object = Subscription.EMPTY;
  public fakeCountArray: Array<any> = []

    @Input() pageResetRequest: Subject<boolean> = new Subject<boolean>();

  constructor(private bookSearch: BookSearchService) {
    this.navModel = new PageNavigatorModel();



    this.bookSearch.registerSearchSourceService()
    this.actualIsbnListSubscription = this.bookSearch.isbnListArrived.subscribe(({data: isbnList}) => {
      console.log(isbnList.count)
        this.navModel.setData(isbnList.list.length, isbnList.count, this.bookSearch.getQuantityPerPage());
        console.log(this.navModel)

       this.fakeCountArray = new Array(this.navModel.getPageNumber());
      console.log(this.fakeCountArray)
    })

    this.bookSearchParamRequest = this.bookSearch.searchParamRequestSubject.subscribe(()=>{
      this.passParameterToBookSearchService()
    })
  }



  ngOnInit(): void {
    this.pageResetRequest.subscribe(()=>
    {
      this.navModel.setOffset(0)
    })
  }

  public pageNumberClicked(page: number)
  {
    console.log(page)
    this.navModel.setStartByClick(page - 1)
    this.bookSearch.initSearch(false)
  }

  public nextPrevClicked(num: number)
  {
    console.log(num)
    this.navModel.incDecPageNumber(num)
    this.bookSearch.initSearch(false)
  }

  private passParameterToBookSearchService()
  {
    this.bookSearch.setOffsetCrit(this.navModel.getOffset());
  }

}
