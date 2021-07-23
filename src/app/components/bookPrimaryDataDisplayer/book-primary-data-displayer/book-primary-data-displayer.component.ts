import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookPrimaryDataDisplayerService} from "../../../services/book/book-primary-data-displayer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-primary-data-displayer',
  templateUrl: './book-primary-data-displayer.component.html',
  styleUrls: ['./book-primary-data-displayer.component.css']
})

/**
 * frame, datasource, and connection for displaying multiple book primary data
 */
export class BookPrimaryDataDisplayerComponent implements OnInit, OnDestroy {

  /**
   * event listener for isbn list -> displayerService
   * @private
   */
  private isbnListener: any = Subscription.EMPTY;

  /**
   * list of isbn of books actually displayed
   */
  public isbnList: Array<string> = [];

  /**
   * count of all books that meets search criteria
   */
  public allFound: number = Infinity;

  /**
   * subscribes for service, when actual books' (from isbn list) data are loaded
   * @param displayerService service for displaying data for books that have been returned by
   * bookSearchService
   */
  constructor(private displayerService: BookPrimaryDataDisplayerService) {

  }

  ngOnInit(): void {
    this.isbnListener = this.displayerService.actualBookDataRefreshed.subscribe(() => {
      this.isbnList = this.displayerService.getActualIsbnList()
      this.allFound = this.displayerService.getAllCount();
    })
  }

  ngOnDestroy(): void {
    this.isbnListener.unsubscribe();
  }

  /**
   * asks the displayerService for a book's primary data by isbn and returns it
   * @param isbn  requested book's isbn
   */
  getPrimaryDataByISBN(isbn: string) {
    return this.displayerService.getPrimaryDataByISBN(isbn)
  }

}
