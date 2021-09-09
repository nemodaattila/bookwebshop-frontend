import {Component, Input} from '@angular/core';
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";
import {BookMetaDataService} from "../../../services/book/book-meta-data.service";

@Component({
  selector: 'app-criteria-multiple-check-box',
  templateUrl: './criteria-multiple-check-box.component.html',
  styleUrls: ['./criteria-multiple-check-box.component.css']
})

/**
 * multiple checkbox type (tags) Criteria Component for complex book search
 */
export class CriteriaMultipleCheckBoxComponent {

  /**
   * serial number of the component
   */
  @Input() public id: number = 0;
  /**
   * all tags sorted alphabetically
   */
  public sortedTags: Array<string> = []
  /**
   * all tag indexes (linked to tags), sorting linked to sortedTags
   */
  public sortedTagIndexes: Array<number> = []
  private selectedIndexes: Array<number> = []

  constructor(private complexSearch: ComplexSearchBrowserService, private metaService: BookMetaDataService) {
    this.sortTags(this.metaService.getTags())
  }

  /**
   * based off an indexed object (tags), creates 2 array: 1 for tags and 1 for indexes, both intended to be sorted by
   * tags alphabetically, calls sorting function
   * @param tags
   */
  sortTags(tags: { [index: number]: string }) {
    let tempKeys = Object.keys(tags)
    let tempValues = Object.values(tags)
    for (let key in tempValues) {
      this.addToTagArray(tempValues[key], tempKeys[key])
      this.sortArrays()
    }
  }

  /**
   * pushes a new tag/index to the appropriate arrays (sortedTags/sortedTagIndex)
   * @param value value/label of the tag
   * @param key index ot the tag
   */
  addToTagArray(value: string, key: string) {
    this.sortedTags.push(value)
    this.sortedTagIndexes.push(parseInt(key))
  }

  /**
   * function for a checkbox check/uncheck click event,
   * pushes/ takes away data into/from selectedIndexes Array
   * check-> puts tag index number into array, uncheck -> removes number from array
   * @param checked checkbox is checked
   * @param key index number associated with checkbox
   */
  boxChecked(checked: boolean, key: number) {
    let inSelectedIndex = this.selectedIndexes.findIndex((num) => {
      return num === key
    })
    if (checked && inSelectedIndex === -1) {
      this.selectedIndexes.push(key)
    }
    if (!checked && inSelectedIndex !== -1) {
      this.selectedIndexes.splice(inSelectedIndex, 1)
    }
    this.complexSearch.setOneSelectedCriteriaValue(this.id, this.selectedIndexes as Array<number>)
  }

  /**
   * sorts both sortedTags and sortedTagIndexes array by sortedTags alphabetically
   * @private
   */
  private sortArrays() {
    if (this.sortedTags.length > 1) {
      let toBeSortedIndex = this.sortedTags.length - 1
      let toBeSortedValue = this.sortedTags[toBeSortedIndex]
      let index = toBeSortedIndex - 1
      while (index >= 0 && (toBeSortedValue < this.sortedTags[index])) {
        [this.sortedTags[toBeSortedIndex], this.sortedTags[index]] = [this.sortedTags[index], this.sortedTags[toBeSortedIndex]];
        [this.sortedTagIndexes[toBeSortedIndex], this.sortedTagIndexes[index]] = [this.sortedTagIndexes[index], this.sortedTagIndexes[toBeSortedIndex]]
        toBeSortedIndex = index
        index--;
      }
    }
  }
}
