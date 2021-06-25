export class PageNavigatorModel {

  private offset: number = 0;

  private actualCount: number = 0;

  private allCount: number = 0;

  private pageNumber: number = 0;

  private actualPage: number = 1;

  private quantityPerPage: number = 10;

  getOffset() {
    return this.offset;
  }

  getQuantityPerPage() {
    return this.quantityPerPage;
  }

  getAllCount() {
    return this.allCount;
  }

  getActualPage() {
    return this.actualPage;
  }

  getPageNumber() {
    return this.pageNumber;
  }

  setData(actualCount: number, allCount: number, quantityPerPage: number) {
    this.actualCount = actualCount;
    this.allCount = allCount;
    this.quantityPerPage = quantityPerPage
    this.pageNumber = Math.ceil(this.allCount / this.quantityPerPage);
    this.actualPage = Math.ceil(this.offset / this.quantityPerPage) + 1;
  }

  setOffset(num: number) {
    this.offset = num;
  }

  incDecPageNumber(num: number) {
    this.offset += this.quantityPerPage * num;
  }

  setStartByClick(pagenum: number) {
    this.offset = pagenum * this.quantityPerPage;
  }

}
