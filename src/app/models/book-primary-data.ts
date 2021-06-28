/**
 * model class for storing primary data of books
 */
export class BookPrimaryData {

  /**
   * name(s) of author(s), with id as index
   * @private
   */
  private readonly author: { [index: number]: string } = {};

  /**
   * sub theme category id of a book
   * @private
   */
  private readonly categoryId: number;

  /**
   * thumbnail of a book cover in string form
   * @private
   */
  private coverThumbnail: string;

  /**
   * discount applying to a book
   * @private
   */
  private readonly discount: number;

  /**
   * isbn of a book
   * @private
   */
  private readonly isbn: string;

  /**
   * price of a book
   * @private
   */
  private readonly price: number;

  /**
   * title of a book
   * @private
   */
  private readonly title: string;

  /**
   * type id of a book (book / audio / ebook)
   * @private
   */
  private readonly typeId: number

  setCoverThumbnail(value: string) {
    this.coverThumbnail = value;
  }

  getAuthor(): { [index: number]: string } {
    return this.author;
  }

  getAuthorByID(id: number): string {
    return this.author[id];
  }

  getCategoryId(): number {
    return this.categoryId;
  }

  getDiscount(): number {
    return this.discount;
  }

  getIsbn(): string {
    return this.isbn;
  }

  getPrice(): number {
    return this.price;
  }

  getTitle(): string {
    return this.title;
  }

  getTypeId(): number {
    return this.typeId;
  }

  getCoverThumbnail(): string {
    return this.coverThumbnail;
  }

  constructor(data: object | any) {
    this.author = (data.author ?? ['UNKNOWN']) as Array<string>;
    this.categoryId = parseInt(data.category_id ?? data.categoryId);
    this.coverThumbnail = data.cover_thumbnail ?? data.coverThumbnail;
    this.discount = parseInt(data.discount ?? data.discount) ?? 0;
    this.isbn = data.isbn ?? data.isbn ?? 'UNKNOWN';
    this.price = parseInt(data.price ?? data.price) ?? 0;
    this.title = data.title ?? data.title ?? "UNKNOWN"
    this.typeId = parseInt(data.type_id ?? data.typeId);
  }
}
