export class BookMetaData {
  private format?: {[index: number]:{[index: number]:string}} = {}
  private language: {[index: number]:string} = {}
  private mainCategory : {[index: number]:string} = {}
  private subCategory: {[index: number]:{[index: number]:string}} = {}
  private tag: {[index: number]:string} = {}
  private targetAudience: {[index: number]:string} = {}
  private type: {[index: number]:string} = {}


  getMainCategory(): {[index: number]:string} {
    return this.mainCategory;
  }

  getSubCategory(): {[index: number]:{[index: number]:string}} {
    return this.subCategory;
  }

  public getTypeById(id: number): string {
    return this.type![id] as string;
  }

  constructor(data: any) {
    console.log(data)
    this.format = data.format;
    this.language = data.language;
    this.mainCategory = data.mainCategory;
    this.subCategory = data.subCategory;
    this.tag = data.tag;
    this.targetAudience = data.targetAudience;
    this.type = data.type;
  }
}
