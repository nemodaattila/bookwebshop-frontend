import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BookPrimaryData} from "../../../models/book-primary-data";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BookMetaDataService} from "../../../services/book-meta-data.service";

@Component({
  selector: 'app-induvidual-book-primary-data-displayer',
  templateUrl: './induvidual-book-primary-data-displayer.component.html',
  styleUrls: ['./induvidual-book-primary-data-displayer.component.css']
})
export class InduvidualBookPrimaryDataDisplayerComponent implements OnInit, OnChanges {

  @Input() primaryData?: BookPrimaryData;
  public safeImgURl?: SafeResourceUrl;
  public authorIds: Array<string>= []
  public typeString?: string

  constructor(private sanitizer: DomSanitizer, private metaService: BookMetaDataService) {
  }


  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.primaryData?.coverThumbnail !== undefined) {
      this.safeImgURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.primaryData.coverThumbnail);
      this.authorIds = Object.keys(this.primaryData.author)
      this.typeString = this.metaService.getTypeById(this.primaryData.typeId)
      // console.log(this.primaryData)
    }
  }

}
