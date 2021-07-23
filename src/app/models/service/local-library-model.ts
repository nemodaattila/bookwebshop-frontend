import {BookData} from "../bookData/book-data";
import {BookPrimaryData} from "../bookData/book-primary-data";

/**
 * model for storing data for already loaded books
 */
export class LocalLibraryModel {

  /**
   * data for books , isbn as index
   * @private
   */
  private books: { [isbn: string]: BookData } = {};

  /**
   * checks if book exists in LocalLibrary based in isbn, returns true if exists
   * @param isbn isbn of the book
   */
  public checkBookInLibrary(isbn: string): boolean {
    return this.books.hasOwnProperty(isbn)
  }

  /**
   * creates an empty object based on isbn
   * @param isbn isbn of the book
   * @param creationTime a Date() value
   * @private
   */
  private createNewBook(isbn: string, creationTime?: number) {
    this.books[isbn] = new BookData(creationTime)
  }

  /**
   * creates a new book and adds primary data
   * @param isbn isbn of the book
   * @param data primary data for the book
   */
  public addBookPrimaryData(isbn: string, data: object) {
    this.createNewBook(isbn)
    this.books[isbn].addPrimaryData(data)
  }

  /**
   *
   * searches for book data that are not older than one day
   * the book data comes as string , from LocalStorage,
   * if its accepted, data will be saved
   * @param localLibraryJSONString local database as string
   */
  public fillFromLocalStorage(localLibraryJSONString: string) {
    let localLibrary = JSON.parse(localLibraryJSONString).books
    for (let isbn in localLibrary) {
      if ((new Date().getTime() - localLibrary[isbn].creationTime) < 86400000) {
        this.fillOne(isbn, localLibrary[isbn])
      }
    }
  }

  /**
   * creates and saves a book originating from localstorage
   * @param isbn isbn of bool
   * @param data data of book
   * @private
   */
  private fillOne(isbn: string, data: any) {
    this.createNewBook(isbn, data.creationTime)
    this.books[isbn].addPrimaryData(data.primaryData)
    if (this.books[isbn] !== undefined) {
      this.books[isbn].addSecondaryData(data.secondaryData)
    }
  }

  /**
   * returns the primary data of a book
   * @param isbn
   */
  getPrimaryData(isbn: string): BookPrimaryData {
    return this.books[isbn].getPrimaryData();
  }
}