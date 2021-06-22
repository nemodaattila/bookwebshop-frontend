import {BookPrimaryData} from "./book-primary-data";
import {BookSecondaryData} from "./book-secondary-data";

export class BookData {

  private primaryData?: BookPrimaryData
  private secondaryData?: BookSecondaryData
  private creationTime?: number;

  constructor(creationTime?: number) {
    this.creationTime = creationTime ?? new Date().getTime();
  }

  public addPrimaryData(data: object)
  {
    this.primaryData = new BookPrimaryData(data)
  }

  addSecondaryData(secondaryData: object) {
    this.secondaryData = new BookSecondaryData(secondaryData)
  }

  getPrimaryData(): BookPrimaryData {
    return <BookPrimaryData>this.primaryData;
  }
}
