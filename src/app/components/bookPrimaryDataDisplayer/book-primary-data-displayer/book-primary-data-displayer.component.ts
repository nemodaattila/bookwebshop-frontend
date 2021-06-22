import { Component, OnInit } from '@angular/core';
import {BookPrimaryDataDisplayerService} from "../../../services/book-primary-data-displayer.service";

@Component({
  selector: 'app-book-primary-data-displayer',
  templateUrl: './book-primary-data-displayer.component.html',
  styleUrls: ['./book-primary-data-displayer.component.css']
})
export class BookPrimaryDataDisplayerComponent implements OnInit {

  constructor(private displayerService: BookPrimaryDataDisplayerService) { }

  getIsbnList()
  {
    return this.displayerService.actualIsbnList
  }

  getPrimaryDataByISBN(isbn: string)
  {
    return this.displayerService.getPrimaryDataByISBN(isbn)
  }

  ngOnInit(): void {
  }

}
