import {Component, Input, OnInit} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/complex-search-browser.service";
import {BookMetaDataService} from "../../../services/book-meta-data.service";

@Component({
  selector: 'app-criteria-multiple-check-box',
  templateUrl: './criteria-multiple-check-box.component.html',
  styleUrls: ['./criteria-multiple-check-box.component.css']
})
export class CriteriaMultipleCheckBoxComponent implements OnInit {

  constructor(private complexSearch: ComplexSearchBrowserService, private metaService: BookMetaDataService) { }

  @Input() public id: number = 0;
  public sortedTags: Array<string>=[]
  public sortedTagIndexes: Array<number>=[]
  private selectedIndexes: Array<number>=[]

  ngOnInit(): void {
    this.sortTags(this.metaService.getTags())
  }

  sortTags(tags: {[index: number]: string})
  {
    console.log(tags)
    let tempKeys= Object.keys(tags)
    let tempValues = Object.values(tags)
    for (let key in tempValues)
    {
        this.addToTagArray(tempValues[key], tempKeys[key])
        this.sortArrays()
    }
  }

  addToTagArray(value: string, key:string)
  {
    this.sortedTags.push(value)
    this.sortedTagIndexes.push(parseInt(key))
  }

  private sortArrays() {
    if (this.sortedTags.length >1)
    {
      let toBeSortedIndex = this.sortedTags.length-1
      let toBeSortedValue = this.sortedTags[toBeSortedIndex]
      let index=toBeSortedIndex-1
      while (index>=0 && (toBeSortedValue<this.sortedTags[index]))
      {
          [this.sortedTags[toBeSortedIndex], this.sortedTags[index]] = [this.sortedTags[index], this.sortedTags[toBeSortedIndex]];
            [this.sortedTagIndexes[toBeSortedIndex], this.sortedTagIndexes[index]] = [this.sortedTagIndexes[index], this.sortedTagIndexes[toBeSortedIndex]]
        toBeSortedIndex = index
        index--;
      }
    }
  }

  isEmpty(key: number) {
    // return this.tags[key] === undefined
  }

  boxChecked(checked: boolean, key: number) {
    let inSelectedIndex = this.selectedIndexes.findIndex((num) => {
      return num === key
    })
    if (checked && inSelectedIndex === -1)
    {
      this.selectedIndexes.push(key)
    }
    if (!checked && inSelectedIndex !== -1)
    {
      this.selectedIndexes.splice(inSelectedIndex,1)
    }
    console.log(this.selectedIndexes)
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.selectedIndexes as Array<number>)
  }
}
