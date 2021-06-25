import {Component, Input, OnChanges} from '@angular/core';
import {BookPrimaryData} from "../../../models/book-primary-data";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {BookMetaDataService} from "../../../services/book-meta-data.service";

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
  @Input() primaryData?: BookPrimaryData;

  /**
   * the book's thumbnail in SafeResourceUrl form
   */
  public safeImgURl?: SafeResourceUrl;

  /**
   * id(s) of the book's author(s) in array
   */
  public authorIds: Array<number> = []

  /**
   * type of the book in string
   */
  public typeString?: string

  /**
   * constructor
   * @param sanitizer value sanitizer
   * @param metaService service for book metadata
   */
  constructor(private sanitizer: DomSanitizer, private metaService: BookMetaDataService) {}

  /**
   *  creates cover thumbnail safe form
   *  creates author id array
   *  asks metaDataService for type by type id
   */
  ngOnChanges(): void {
    if (this.primaryData?.getCoverThumbnail() !== undefined) {
      this.safeImgURl = this.sanitizer.bypassSecurityTrustResourceUrl(this.primaryData.getCoverThumbnail());
    }
    if (this.primaryData?.getAuthor() !== undefined) {
      const aIDs = Object.keys(this.primaryData?.getAuthor())
      this.authorIds = aIDs.map(value => parseInt(value))
    }
    if (this.primaryData?.getTypeId() !== undefined) {
      this.typeString = this.metaService.getTypeById(this.primaryData.getTypeId())
    }
  }
}
