import {BookData} from "./book-data";

export class LocalLibraryModel {
  private books: { [isbn: string]: BookData }={};

  public checkBookInLibrary(isbn: string)
  {
    return this.books.hasOwnProperty(isbn)
  }

  private createNewBook(isbn: string, creationTime?: number)
  {
    this.books[isbn]=new BookData(creationTime)
  }

  public addBookPrimaryData(isbn: string, data: object) {
    this.createNewBook(isbn)
    this.books[isbn].addPrimaryData(data)
  }

  public fillFromLocalStorage(localLibraryJSONString: string) {
    let localLibrary = JSON.parse(localLibraryJSONString).books
    for (let isbn in localLibrary)
    {
      if ((new Date().getTime() - localLibrary[isbn].creationTime) < 86400000)
      {
        this.fillOne(isbn, localLibrary[isbn])
      }
    }
    console.log(this.books)
  }

  private fillOne(isbn: string, data: any)
  {
    console.log(data)
    this.createNewBook(isbn, data.creationTime)
    this.books[isbn].addPrimaryData(data.primaryData)
    if (this.books[isbn] !== undefined)
    {
      this.books[isbn].addSecondaryData(data.secondaryData)
    }
  }

}
