import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookCriteriaDataListFillerService} from "../../../services/book/book-criteria-data-list-filler.service";
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";
import {FormService} from "../../../services/helper/form.service";
import {GlobalMessageDisplayerService} from "../../../services/helper/global-message-displayer.service";
import {BookDataAdderService} from "../../../services/book/book-data-adder.service";

@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css'],
})
export class BookUploadComponent implements OnInit {

  @ViewChild('bc') coverFileElement!: ElementRef;

  constructor(protected dataListService: BookCriteriaDataListFillerService,
              public browserService: ComplexSearchBrowserService, protected formService: FormService,
              protected messageServ: GlobalMessageDisplayerService, protected bookAdderServ: BookDataAdderService) {
  }

  dataForm!: FormGroup;

  authorSearchValue: string = ''
  dataListNames: Array<string> = ['author', 'publisher', 'series'];

  activeDatalist!: number;

  public authorDataList: Array<string> = [];
  public publisherDataList: Array<string> = [];
  public seriesDataList: Array<string> = [];

  public category: Array<any> = []
  public format: Array<any> = []

  public tag: Array<any> = []

  public discountTypes: Array<[string, number]> = []

  coverThumbnailString: string = '';
  coverSource: string = '';

  ngOnInit(): void {
    this.initFormGroup()
    this.dataListService.dataListEmitter.subscribe(value => {
      switch (this.activeDatalist) {
        case 0:
          this.authorDataList = value as string[]
          break
        case 1:
          this.publisherDataList = value as string[]
          break
        case 2:
          this.seriesDataList = value as string[]
          break
      }
    })
    this.initSelectOptions()
  }

  protected initSelectOptions() {
    this.category = this.browserService.getGroupedOptions('Category')
    this.format = this.browserService.getGroupedOptions('Format')
    this.tag = this.browserService.getSortedTags()
    this.discountTypes = this.browserService.getDiscountTypes()
  }

  boxChecked(checked: boolean, key: number) {
    let tagIDs = this.dataForm['controls']['tags'].value
    console.log(tagIDs)

    let tags = (tagIDs === null) ? [] : tagIDs.split(',')
    if (tags === ['']) tags = []
    if (checked) {
      tags.push(key)
      tags.sort()
    } else {
      tags = tags.filter((e: number) => e !== key)
    }
    tags = [...new Set(tags)]
    console.log(tags)
    this.dataForm['controls']['tags'].setValue(tags.join(','))
  }

  getItemGroupIndexesByIndex(type: string, gr: string) {
    if (type === 'category')
      return Object.keys(this.category[2][parseInt(gr)])
    if (type === 'format')
      return Object.keys(this.format[2][parseInt(gr)])
    return []
  }

  getItemLabel(type: string, group: string, index: string) {
    if (type === 'category')
      return this.category[2][parseInt(group)][parseInt(index)]
    if (type === 'format')

      return this.format[2][parseInt(group)][parseInt(index)]
  }

  isEmpty(name: any) {
    return name === undefined
  }

  protected initFormGroup(): void {
    this.dataForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      isbn: new FormControl(),
      author: new FormControl(),
      type: new FormControl(1),
      category: new FormControl(1),
      publisher: new FormControl(),
      series: new FormControl(),
      targetAudience: new FormControl(51),
      language: new FormControl(1),
      year: new FormControl(),
      page: new FormControl(),
      format: new FormControl(1),
      weight: new FormControl(),
      size: new FormControl(),
      description: new FormControl(),
      tags: new FormControl(),
      price: new FormControl(0),
      discount: new FormControl(0),
      discountType: new FormControl(0),
      coverUrl: new FormControl(),
      coverFile: new FormControl()
    });
  }

  formErrorMessages = {
    title: {required: 'BUN'},
  };

  setActiveDL(num: number) {
    this.activeDatalist = num
  }

  passValueToService(num: number) {
    this.emptyDatalist(num)
    let value
    switch (num) {
      case 0:
        value = this.authorSearchValue
        break
      case 1:
        value = this.dataForm['controls']['publisher'].value
        break
      case 2:
        value = this.dataForm['controls']['series'].value
        break
    }
    if (value.length > 2) {
      this.dataListService.getDataList(this.dataListNames[num], value)
    }
  }

  emptyDatalist(num: number) {
    switch (num) {
      case 0:
        this.authorDataList = []
        break
      case 1:
        this.publisherDataList = []
        break
      case 2:
        this.seriesDataList = []
        break
    }
  }

  addAuthor() {
    let authText = this.dataForm['controls']['author'].value

    let auths = (authText === null || authText === '') ? [] : authText.split(',')
    auths.push(this.authorSearchValue)
    auths.sort()
    auths = [...new Set(auths)]
    this.authorSearchValue = ''
    this.dataForm['controls']['author'].setValue(auths.join(','))
  }

  changeDiscountValue() {
    let val = this.dataForm['controls']['discountType'].value
    this.dataForm['controls']['discount'].setValue(this.discountTypes[val][1])
  }

  addThumbnailFromUrl() {
    this.dataForm['controls']['coverFile'].setValue(null)
    this.coverFileElement.nativeElement.value = ''
    this.coverThumbnailString = this.dataForm['controls']['coverUrl'].value
    const isUrl = () => {
      try {
        return Boolean(new URL(this.coverThumbnailString));
      } catch (e) {
        return false;
      }
    }
    if (isUrl()) {
      const isImg = (this.coverThumbnailString.match(/\.(jpeg|jpg|gif|png)$/) != null);
      if (isImg) {
        this.coverSource = this.coverThumbnailString
        return
      }
    }
    this.coverSource = ''
    return
  }

  addThumbnailFromFile(event: any) {
    this.dataForm['controls']['coverUrl'].setValue(null)
    this.coverThumbnailString = ''
    const file: File = event.target!.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.coverSource = reader.result as string
        this.dataForm['controls']['coverFile'].setValue(reader.result as string)
      };
    } else {
      this.coverSource = ''
      this.dataForm['controls']['coverFile'].setValue(null)
    }
  }

  submit() {

    const formValid = this.formService.checkFormError(this.dataForm, this.formErrorMessages);
    if (formValid !== '') {
      this.messageServ.displayFail('BUFM', formValid)
      return;
    }
    const data = this.dataForm.value;
    this.bookAdderServ.addNewBook(data)
  }

}
