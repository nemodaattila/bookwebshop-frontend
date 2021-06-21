import {LocalLibraryBookModel} from "./local-library-book-model";

export class LocalLibraryModel {
  private books: { [isbn: string]: LocalLibraryBookModel }={};

  public checkBookInLibrary(isbn: string)
  {
    return this.books.hasOwnProperty(isbn)
  }

  addBookPrimaryData(isbn: string, data: object) {
    //itt
  }
}
