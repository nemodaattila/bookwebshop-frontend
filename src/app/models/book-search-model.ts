/**
 * model class, containing parameters for book search
 */

export class BookSearchModel {

  /**
   * query offset, from which result to query
   * @private
   */
  private offset: number = 0;

  /**
   * query limit, how many result to get
   * @private
   */
  private limit: number = 10;

  /**
   * order parameter of result (sql table parameter)
   * @private
   */
  private order: string = "Title"

  /**
   * direction of order (ASC/ DESC)
   * @private
   */
  private orderDir: string = "ASC";

  /**
   * criteria of the last search (needed for offline ordering)
   * @private
   */
  private prevCriteria: [string, number]=['{}',10];

  /**
   *  criteria of the new search (needed for offline ordering)
   * obsolete ???
   * @private
   */
  private newCriteria: [string, number]=['{}',10];

  /**
   * multiple criteria of the search e.g: category,price, with criteria type as index
   * @private
   */
  private criteria: {[index: string]:any} = {};

  private lastSearchAllResultCount: number = Infinity;

  public setLastSearchAllResultCount(count: number)
  {
    this.lastSearchAllResultCount = count
  }

  public getLastSearchAllResultCount(): number
  {
    return this.lastSearchAllResultCount
  }

  public getOrder(): string
  {
    return this.order
  }

  public getLimit(): number{
    return this.limit
  }

  public setOffset(offset: number)
  {
    this.offset = offset
  }

  setCriteria(type: string, value: any)
  {
    this.criteria[type] = value;
  };

  getNewCriteria(): [string, number]
  {
    return this.newCriteria
  }

  getPrevCriteria(): [string, number]
  {
    return this.prevCriteria
  }

  /**
   * removing a criteria type
   * @param type
   */
  delCriteria(type: string)
  {
    if (this.criteria[type] !== undefined)
      delete this.criteria[type]
  };

  /**
   * resetting parameters
   */
  setDefault() {
    this.offset = 0;
    this.limit = 10;
    this.order = "Title";
    this.orderDir = "ASC";
    this.criteria = {};
  };

  /**
   * saving the previous search criteria for comparison for local ordering
   */
  setPrevCriteria() {
    this.prevCriteria[0] = JSON.stringify(this.criteria);
    this.prevCriteria[1] = this.limit;
  }

  /*
  *saving the new search criteria for comparison for local ordering
  */
  setNewCriteria() {
    this.newCriteria[0] = JSON.stringify(this.criteria);
    this.newCriteria[1] = this.limit;
  }

  /**
   * setting order and limit parameter
   * @param order parameter for order type
   * @param orderDir direction of order: asc/desc
   * @param limit num of requested results
   */
  setOrderAndLimit(order: string, orderDir: string, limit:number)
  {
    this.order = order
    this.orderDir = orderDir
    this.limit = limit
  }

  /**
   * return all search parameters
   */
  getSearchParams() {
    return {
      criteria: this.criteria,
      offset: this.offset,
      limit: this.limit,
      order: this.order,
      orderDir: this.orderDir
    };
  }
}
