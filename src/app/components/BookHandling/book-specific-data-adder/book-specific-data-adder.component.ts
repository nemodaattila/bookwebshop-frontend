import {Component, OnInit} from '@angular/core';
import {BookQuickDataAdderService} from "../../../services/book/book-quick-data-adder.service";

@Component({
  selector: 'app-book-specific-data-adder',
  templateUrl: './book-specific-data-adder.component.html',
  styleUrls: ['./book-specific-data-adder.component.css']
})
export class BookSpecificDataAdderComponent implements OnInit {

  constructor(private dataAdder: BookQuickDataAdderService) {
  }

  ngOnInit(): void {
  }

  selectIndex: number = 0

  inputValue: string = '';

  addNewParam() {
    console.log(this.inputValue)
    if (this.inputValue.length > 2) {
      this.dataAdder.addNewData(this.selectIndex, this.inputValue)

    }
    this.inputValue = ''
  }

}
