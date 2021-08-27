import {Component} from '@angular/core';
import {BookDataHandlerService} from "../../../services/book/book-data-handler.service";

@Component({
  selector: 'app-book-specific-data-adder',
  templateUrl: './book-specific-data-adder.component.html',
  styleUrls: ['./book-specific-data-adder.component.css']
})
export class BookSpecificDataAdderComponent {

  constructor(private dataAdder: BookDataHandlerService) {
  }

  selectIndex: number = 0

  inputValue: string = '';

  addNewParam() {
    if (this.inputValue.length > 2) {
      this.dataAdder.addNewData(this.selectIndex, this.inputValue)
    }
    this.inputValue = ''
  }
}
