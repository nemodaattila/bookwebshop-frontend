export class BookMetaData {
  private format?:{}[];
  private language?: [];
  private _mainCategory?:Array<string>;
  private _subCategory?:{}[];
  private tag?:{}[];
  private targetAudience?:{}[];
  private type?: {}[];


  get mainCategory(): Array<string> | undefined {
    return this._mainCategory;
  }

  get subCategory(): {}[] | undefined {
    return this._subCategory;
  }

  constructor(data: any) {

    this.format = data.format;
    this.language = data.language;
    this._mainCategory = data._mainCategory;
    this._subCategory = data._subCategory ;
    this.tag = data.tag;
    this.targetAudience = data.targetAudience;
    this.type = data.type;
  }
}
