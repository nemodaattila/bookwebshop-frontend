export class BookPrimaryData {

  private _author: Array<string>;
  private _categoryId: number;
  private _coverThumbnail: string;
  private _discount: number;
  private _isbn: string;
  private _price :number;
  private _title: string;
  private _typeId: number


  set coverThumbnail(value: string) {
    this._coverThumbnail = value;
  }

  get author(): Array<string> {
    return this._author;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  get discount(): number {
    return this._discount;
  }

  get isbn(): string {
    return this._isbn;
  }

  get price(): number {
    return this._price;
  }

  get title(): string {
    return this._title;
  }

  get typeId(): number {
    return this._typeId;
  }

  get coverThumbnail(): string {
    return this._coverThumbnail;
  }

  constructor(data: object | any ) {
    this._author = data.author ?? data._author ??'UNKNOWN';
    this._categoryId = parseInt(data.category_id) ?? parseInt(data._categoryId);
    this._coverThumbnail = data.cover_thumbnail ?? data._coverThumbnail;
    this._discount = parseInt(data.discount) ?? parseInt(data._discount) ?? 0;
    this._isbn = data.isbn ?? data._isbn ?? 'UNKNOWN';
    this._price = parseInt(data.price) ?? parseInt(data._price) ?? 0;
    this._title = data.title ?? data._title ?? "UNKNOWN"
    this._typeId = parseInt(data.type_id) ?? parseInt(data._typeId);
  }
}
