export class BookSearchModel {

  private offset: number = 0;

  private limit: number = 10;

  private order: string = "Title"

  private orderDir: string = "ASC";

  private prevCrit: [string?, number?]=[];

  private newCrit: [string?, number?]=[];

  private crit: {} = {};

  //  _criteriumSourceObject = [];

  setDefault() {
    this.offset = 0;
    this.limit = 10;
    this.order = "Title";
    this.orderDir = "ASC";
    this.crit = {};
  };

  setPrevCrit() {
    this.prevCrit[0] = JSON.stringify(this.crit);
    this.prevCrit[1] = this.limit;
  }

  setNewCrit() {

    this.newCrit[0] = JSON.stringify(this.crit);
    this.newCrit[1] = this.limit;
  }

  getSearchParams() {
    return {
      criterium: JSON.stringify(this.crit),
      offset: this.offset,
      limit: this.limit,
      order: this.order,
      orderDir: this.orderDir
    };
  }
}
