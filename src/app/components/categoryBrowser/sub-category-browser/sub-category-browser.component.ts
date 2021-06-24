import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sub-category-browser',
  templateUrl: './sub-category-browser.component.html',
  styleUrls: ['./sub-category-browser.component.css']
})
export class SubCategoryBrowserComponent implements OnInit, OnChanges {

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this)
    }
  @Input() public label?: string;
  @Input() public id:number = 0;

  @Output() subSearchNotify: EventEmitter<[string, number]> = new EventEmitter<[string, number]>();


  ngOnInit(): void {

  }

  initsubSearch()
  {
    this.subSearchNotify.emit(['Category', this.id])
  }


}
