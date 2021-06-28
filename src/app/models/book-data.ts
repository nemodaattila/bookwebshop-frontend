import {BookPrimaryData} from "./book-primary-data";
import {BookSecondaryData} from "./book-secondary-data";

/**
 * contains data for a book
 */
export class BookData {

  /**
   * contains the primary data of a book:
   * ISBN, Title, author(s), price, discount, category id, and book type id
   * @private
   */
  private primaryData?: BookPrimaryData

  /**
   * contains secondary data of a book
   * @see BookSecondaryData
   * @private
   */
  private secondaryData?: BookSecondaryData

  /**
   * creation time of the BookData object (needed for the data fresh)
   * @private
   */
  private creationTime?: number;

  /**
   * sets the creationTime parameter
   * @param creationTime
   */
  constructor(creationTime?: number) {
    this.creationTime = creationTime ?? new Date().getTime();
  }

  /**
   * creates new BookPrimaryData object based in object data
   * @param data
   */
  public addPrimaryData(data: object) {
    this.primaryData = new BookPrimaryData(data)
  }

  /**
   * creates new BookSecondaryData object based in object data
   * @param secondaryData
   */
  addSecondaryData(secondaryData: object) {
    this.secondaryData = new BookSecondaryData(secondaryData)
  }

  /**
   * returns the primary Data of a book
   */
  getPrimaryData(): BookPrimaryData {
    return <BookPrimaryData>this.primaryData;
  }
}
