/**
 * contains data for a book
 */

export class BookData {

  private primaryOnly: boolean = true

  /**
   * creation time of the BookData object (needed for the data fresh)
   * @private
   */
  private creationTime?: number;

  private isbn?: string;
  private title: string = 'UNKNOWN';

  private typeId?: number

  private author: { [index: number]: string } = {};

  private categoryId?: number;

  private cover?: string;

  private coverThumbnail?: string;

  private discount?: number

  private discountType?: { [index: number]: string }

  private languageId?: number

  private price?: number

  getAuthor(): { [index: number]: string } {
    return this.author;
  }

  getAuthorByID(id: number): string {
    return this.author[id];
  }

  getCategoryId(): number {
    return this.categoryId!
  }

  getDiscount(): number {
    return this.discount!
  }

  getIsbn(): string {
    return this.isbn!
  }

  getPrice(): number {
    return this.price!
  }

  getTitle(): string {
    return this.title
  }

  getTypeId(): number {
    return this.typeId!
  }

  setCoverThumbnail(value: string) {
    this.coverThumbnail = value;
  }

  getCoverThumbnail(): string {
    return this.coverThumbnail!
  }

  getCover(): string {
    return this.cover!
  }

  /**
   * sets the creationTime parameter
   * @param creationTime
   */
  constructor(creationTime?: number) {
    this.creationTime = creationTime ?? new Date().getTime();
  }

  public primaryDataOnly(): boolean {
    return this.primaryOnly
  }

  public setPrimaryOnlyToFalse() {
    this.primaryOnly = false
  }

  /**
   * creates new BookPrimaryData object based in object data
   * @param data
   */
  public addPrimaryData(data: { [index: string]: any }) {
    // console.log(data)
    this.isbn = data.isbn ?? 'UNKNOWN';
    this.title = data.title
    this.typeId = parseInt(data.type_id ?? data.typeId)
    this.author = data.author ?? ['UNKNOWN']
    this.categoryId = parseInt(data.category_id ?? data.categoryId)
    this.coverThumbnail = data.cover_thumbnail ?? data.coverThumbnail;
    this.discount = parseInt(data.discount) ?? 0
    this.price = parseInt(data.price) ?? 0;
    // console.log(this)
  }

  public fillDataFromLocalStorage(data: { [index: string]: any }) {
    this.primaryOnly = data.primaryOnly
    this.addPrimaryData(data)
    this.addSecondaryData(data)
  }

  //
  /**
   * creates new BookSecondaryData object based in object data
   * @param data
   */
  public addSecondaryData(data: { [index: string]: any }) {
    // console.log(data)
    this.cover = data.cover
    this.discountType = data.discount_type ?? data.dicountType
    this.languageId = data.language_id ?? data.languageId
    // console.log(this)

  }

  //
  // /**
  //  * returns the primary Data of a book
  //  */
  getPrimaryData() {
    // return <BookPrimaryData>this.primaryData;
  }

  //
  // getSecondaryData(): BookSecondaryData {
  //   return <BookSecondaryData>this.secondaryData;
  // }
}
