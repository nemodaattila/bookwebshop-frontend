export class BookPrimaryData {

  private author: {[index: number]:string} = {};
  private categoryId: number;
  private coverThumbnail: string;
  private discount: number;
  private isbn: string;
  private price :number;
  private title: string;
  private typeId: number

  setCoverThumbnail(value: string) {
    this.coverThumbnail = value;
  }

  getAuthor(): {[index: number]:string}  {
    return this.author;
  }

  getAuthorByID(id: number): string
  {
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

  constructor(data: object | any ) {
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
