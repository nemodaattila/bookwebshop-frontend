import {Component, Input, OnChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BookMetaDataService} from "../../../services/book/book-meta-data.service";
import {BookData} from "../../../models/bookData/book-data";

@Component({
  selector: 'app-individual-book-primary-data-displayer',
  templateUrl: './individual-book-primary-data-displayer.component.html',
  styleUrls: ['./individual-book-primary-data-displayer.component.css']
})

/**
 * displays one book's primary data
 */
export class IndividualBookPrimaryDataDisplayerComponent implements OnChanges {

  /**
   * primary data of the book - comes from BookPrimaryDataDisplayer component
   */
  @Input() bookData!: BookData;

  /**
   * the book's thumbnail in SafeResourceUrl form
   */
  public safeImgURl!: SafeResourceUrl;

  /**
   * id(s) of the book's author(s) in array
   */
  public authorIds: Array<number> = []

  /**
   * type of the book in string
   */
  public typeString!: string

  /**
   * constructor
   * @param sanitizer value sanitizer
   * @param metaService service for book metadata
   */
  constructor(private sanitizer: DomSanitizer, private metaService: BookMetaDataService) {
  }

  /**
   *  creates cover thumbnail safe form
   *  creates author id array
   *  asks metaDataService for type by type id
   */
  ngOnChanges(): void {
    if (this.bookData?.getCoverThumbnail() !== undefined) {
      this.safeImgURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.bookData.getCoverThumbnail());
    }
    if (this.bookData?.getAuthor() !== undefined) {
      const aIDs = Object.keys(this.bookData?.getAuthor())
      this.authorIds = aIDs.map(value => parseInt(value))
    }
    if (this.bookData?.getTypeId() !== undefined) {
      this.typeString = this.metaService.getTypeById(this.bookData.getTypeId())
    }
  }
}
