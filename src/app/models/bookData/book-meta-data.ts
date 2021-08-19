/**
 * contains metadata for books
 */
export class BookMetaData {

  /**
   * the possible formats of books grouped by type_id
   * e.g.: { 1 (book): {1: hardcover, 2: softcover}}, 2 (audio): {3: audioCd, 4: cassette}
   * @private
   */
  private readonly format: { [index: number]: { [index: number]: string } } = {}

  /**
   * possible language of books
   * @private
   */
  private readonly language: { [index: number]: string } = {}

  /**
   * main theme categories of books
   * e.g:
   entertainer literature, history
   * @private
   */
  private readonly mainCategory: { [index: number]: string } = {}

  /**
   * theme subcategories of books grouped by main category id
   * e.g.: { 1 (entertainer literature): {1: comics, 2:
belles-lettres}}, 2 (learning): {3: lexicon, 4: school book}
   * @private
   */
  private readonly subCategory: { [index: number]: { [index: number]: string } } = {}

  /**
   * possible tags/labels for books: e.g: magical, sci/fi, time-travel, romantic
   * @private
   */
  private readonly tag: { [index: number]: string } = {}

  /**
   * possible target audiences for books, e.g. : all-age, 0-6 years, 13-17 year old girl's
   * @private
   */
  private readonly targetAudience: { [index: number]: string } = {}

  /**
   * type of books: (physical) book, audio book, e-book
   * @private
   */
  private readonly type: { [index: number]: string } = {}

  private readonly discountType: { [index: number]: [string, number] } = {}

  getMainCategory(): { [index: number]: string } {
    return this.mainCategory;
  }

  getSubCategory(): { [index: number]: { [index: number]: string } } {
    return this.subCategory;
  }

  getTags(): { [index: number]: string } {
    return this.tag;
  }

  getType(): { [index: number]: string } {
    return this.type;
  }

  getLanguage(): { [index: number]: string } {
    return this.language;
  }

  getFormat(): { [index: number]: { [index: number]: string } } {
    return this.format;
  }

  getDiscountType(): { [p: number]: [string, number] } {
    return this.discountType;
  }

  /**
   * return book type by id
   * @param id
   */
  public getTypeById(id: number): string {
    return this.type![id] as string;
  }

  public getTargetAudience(): { [index: number]: string } {
    return this.targetAudience;
  }

  /**
   * returns target audience name by id
   * @param id
   */
  public getTargetAudienceNameById(id: number): string {
    return this.targetAudience[id];
  }

  /**
   * return category name by id
   * @param id
   */
  public getCategoryNameByID(id: number): any {
    for (let key of Object.values(this.subCategory)) {
      if (key.hasOwnProperty(id)) {
        return key[id];
      }
    }
    return ''
  }

  constructor(data: any) {
    this.format = data.format;
    this.language = data.language;
    this.mainCategory = data.mainCategory;
    this.subCategory = data.subCategory;
    this.tag = data.tag;
    this.targetAudience = data.targetAudience;
    this.type = data.type;
    this.discountType = data.discountType;
  }
}
