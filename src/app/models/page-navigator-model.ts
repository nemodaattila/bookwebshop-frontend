/**
 * model class for PageNavigator
 */
export class PageNavigatorModel {

  /**
   * query offset, from which result to display
   * @private
   */
  private offset: number = 0;

  /**
   * number of displayed results of the actual search
   * @private
   */
  private actualCount: number = 0;

  /**
   * number of all possible result, that meets criteria
   * @private
   */
  private allCount: number = 0;

  /**
   * number of pages based on allCount
   * @private
   */
  private pageNumber: number = 0;

  /**
   * the number of actually loaded page
   * @private
   */
  private actualPage: number = 1;

  /**
   * the number of results displayed on the actual page
   * @private
   */
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

  /**
   * increases/decreases the offset for loading next/ prev page
   * @param num number to increase/decrease with (*10)
   */
  incDecPageNumber(num: number) {
    this.offset += this.quantityPerPage * num;
  }

  /**
   * set the offset according to page number
   * @param pageNum number to increase/decrease with (*10)
   */
  setStartByClick(pageNum: number) {
    this.offset = pageNum * this.quantityPerPage;
  }

}
