import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BookPrimaryData} from "../../../models/book-primary-data";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-induvidual-book-primary-data-displayer',
  templateUrl: './induvidual-book-primary-data-displayer.component.html',
  styleUrls: ['./induvidual-book-primary-data-displayer.component.css']
})
export class InduvidualBookPrimaryDataDisplayerComponent implements OnInit, OnChanges {

  @Input() primaryData?: BookPrimaryData;
  public safeImgURl?: SafeResourceUrl;
  public authorIds: Array<string>= []

  constructor(private sanitizer: DomSanitizer) {
  }


  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.primaryData?.coverThumbnail !== undefined) {
      this.safeImgURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.primaryData.coverThumbnail);
      this.authorIds = Object.keys(this.primaryData.author)
      console.log(this.primaryData)
    }
  }

}
