export class BookMetaData {
  private format?:{}[];
  private language?: [];
  private mainCategory?:{}[];
  private subCategory?:{}[];
  private tag?:{}[];
  private targetAudience?:{}[];
  private type?: {}[];

  constructor(data: any) {

    this.format = data.format;
    this.language = data.language;
    this.mainCategory = data.mainCategory;
    this.subCategory = data.subCategory ;
    this.tag = data.tag;
    this.targetAudience = data.targetAudience;
    this.type = data.type;
  }
}
