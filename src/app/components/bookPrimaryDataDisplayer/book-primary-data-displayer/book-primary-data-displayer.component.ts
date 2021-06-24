import { Component, OnInit } from '@angular/core';
import {BookPrimaryDataDisplayerService} from "../../../services/book-primary-data-displayer.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-primary-data-displayer',
  templateUrl: './book-primary-data-displayer.component.html',
  styleUrls: ['./book-primary-data-displayer.component.css']
})
export class BookPrimaryDataDisplayerComponent implements OnInit {

  constructor(private displayerService: BookPrimaryDataDisplayerService) {
    this.isbnListener = this.displayerService.actualBookDataRedreshed.subscribe(()=>
    {
      this.isbnList = this.displayerService.actualIsbnList
      this.allFound = this.displayerService.getAllCount();
    })
  }

  private isbnListener: any = Subscription.EMPTY;

  public isbnList: Array<string> =[];
  public allFound: number =Infinity;

  getPrimaryDataByISBN(isbn: string)
  {
    return this.displayerService.getPrimaryDataByISBN(isbn)
  }

  ngOnInit(): void {
  }

}
