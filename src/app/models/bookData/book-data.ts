/**
 * contains data for a book
 */

export class BookData {

  private primaryOnly: boolean = true

  /**
   * creation time of the BookData object (needed for the data fresh)
   * @private
   */
  private creationTime!: number;

  private isbn!: string;
  private title: string = 'UNKNOWN';

  private typeId: number = 1

  private author: { [index: number]: string } = {};

  private categoryId: number = 0;

  private cover!: string;

  private coverThumbnail!: string;

  private discount: number = 0

  private discountType!: { [index: number]: string }

  private format: number = 1

  private languageId!: number

  private price!: number

  private pageNumber: number = 0;

  private physicalSize!: string;

  private publisher!: string

  private series: string | null = null

  private shortDescription!: string;

  private tags: Array<number> = [];

  private targetAudienceId!: number;

  private weight!: number;

  private year: number = 0;

  /**
   * sets the creationTime parameter
   * @param creationTime
   */
  constructor(creationTime?: number) {
    this.creationTime = creationTime ?? new Date().getTime();
  }

  getAuthor(): { [index: number]: string } {
    return this.author;
  }

  getAuthorByID(id: number): string {
    return this.author[id];
  }

  getCategoryId(): number {
    return this.categoryId
  }

  getDiscount(): number {
    return this.discount
  }

  getDiscountTypeID(): number {
    return Number(Object.keys(this.discountType)[0])
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
    return this.typeId
  }

  getCoverThumbnail(): string {
    return this.coverThumbnail!
  }

  getCover(): string {
    return this.cover!
  }

  getPageNumber(): number {
    return this.pageNumber
  }

  getSeries(): string | null {
    return this.series
  }

  getTags(): Array<number> {
    return this.tags
  }

  getWeight(): number | undefined {
    return this.weight
  }

  public primaryDataOnly(): boolean {
    return this.primaryOnly
  }

  public setPrimaryOnlyToFalse() {
    this.primaryOnly = false
  }

  public getTargetAudienceId(): number {
    return this.targetAudienceId!
  }

  public getLanguageID(): number {
    return this.languageId!
  }

  public getPhysicalSize(): string | undefined {
    return this.physicalSize
  }

  public getPublisher(): string {
    return this.publisher!
  }

  public getDescription(): string | undefined {
    return this.shortDescription
  }

  public getYear(): number {
    return this.year
  }

  public getFormat(): number {
    return this.format
  }

  /**
   * fills the primary data of a book
   * @param data
   */
  public addPrimaryData(data: { [index: string]: any }) {
    this.isbn = data.isbn ?? 'UNKNOWN';
    this.title = data.title
    this.typeId = parseInt(data.type_id ?? data.typeId)
    this.author = data.author ?? ['UNKNOWN']
    this.categoryId = parseInt(data.category_id ?? data.categoryId)
    this.coverThumbnail = data.cover_thumbnail ?? data.coverThumbnail;
    this.discount = parseInt(data.discount) ?? 0
    this.price = parseInt(data.price) ?? 0;
  }

  /**
   * fills book with data
   * @param data
   */
  public fillDataFromLocalStorage(data: { [index: string]: any }) {
    this.primaryOnly = data.primaryOnly
    this.addPrimaryData(data)
    this.addSecondaryData(data)
  }

  /**
   * fills secondary data of a book
   * @param data
   */
  public addSecondaryData(data: { [index: string]: any }) {
    this.cover = data.cover
    console.log(data.discount_type)
    console.log(data.discountType)
    this.discountType = data.discountType ?? ((data.discount_type !== undefined) ? (data.discount_type) : {0: 'None'})
    this.format = data.format ?? data.format_id
    this.languageId = data.language_id ?? data.languageId
    this.pageNumber = parseInt(data.page_number ?? data.pageNumber)
    this.physicalSize = data.physicalSize ?? data.physical_size ?? undefined
    this.publisher = data.publisher
    this.series = data.series
    this.shortDescription = data.short_description ?? data.shortDescription
    this.tags = data.tags
    this.targetAudienceId = data.target_audience_id ?? data.targetAudienceId
    this.weight = data.weight ?? undefined
    this.year = Number(data.year)
  }
}
