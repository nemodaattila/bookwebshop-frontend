import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {BookCriteriaDataListFillerService} from "../../../services/book/book-criteria-data-list-filler.service";
import {ComplexSearchBrowserService} from "../../../services/book/complex-search-browser.service";

@Component({
  selector: 'app-book-upload',
  templateUrl: './book-upload.component.html',
  styleUrls: ['./book-upload.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookUploadComponent implements OnInit {

  @ViewChild('bc') coverFileElement!: ElementRef;

  constructor(private dataListService: BookCriteriaDataListFillerService,
              public browserService: ComplexSearchBrowserService) {
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
      console.log(value)
      console.log(this.activeDatalist)
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

  private initSelectOptions() {
    this.category = this.browserService.getGroupedOptions('Category')
    this.format = this.browserService.getGroupedOptions('Format')

    this.tag = this.browserService.getSortedTags()
    console.log(this.tag)
    this.discountTypes = this.browserService.getDiscountTypes()
  }

  boxChecked(checked: boolean, key: number) {
    let tagIDs = this.dataForm['controls']['tags'].value
    let tags = (tagIDs === null) ? [] : tagIDs.split(',')
    if (tags === ['']) tags = []
    if (checked) {
      tags.push(key)
      tags.sort()
    } else {
      tags = tags.filter((e: number) => e !== key)
    }
    tags = [...new Set(tags)]
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

  private initFormGroup(): void {
    this.dataForm = new FormGroup({
      title: new FormControl(),
      isbn: new FormControl(),
      author: new FormControl(),
      type: new FormControl(1),
      category: new FormControl(1),
      publisher: new FormControl(),
      series: new FormControl(),
      targetAudience: new FormControl(11),
      language: new FormControl(1),
      year: new FormControl(),
      page: new FormControl(0),
      format: new FormControl(1),
      weight: new FormControl(),
      size: new FormControl(),
      description: new FormControl(),
      tags: new FormControl(),
      price: new FormControl(),
      discount: new FormControl(0),
      discountType: new FormControl(0),
      coverUrl: new FormControl(),
      coverFile: new FormControl()
    });
  }

  setActiveDL(num: number) {
    this.activeDatalist = num
  }

  passValueToService(num: number) {
    console.log(num)
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
    console.log(authText)
    let auths = (authText === null) ? [] : authText.split(',')
    if (auths === ['']) auths = []
    auths.push(this.authorSearchValue)
    auths.sort()
    auths = [...new Set(auths)]
    this.dataForm['controls']['author'].setValue(auths.join(','))
  }

  changeDiscountValue() {
    let val = this.dataForm['controls']['discountType'].value
    console.log(val)
    this.dataForm['controls']['discount'].setValue(this.discountTypes[val][1])
  }

  addThumbnailFromUrl() {
    this.dataForm['controls']['coverFile'].setValue(null)
    this.coverFileElement.nativeElement.value = ''
    this.coverThumbnailString = this.dataForm['controls']['coverUrl'].value
    console.log(this.coverThumbnailString)
    const isUrl = () => {
      try {
        return Boolean(new URL(this.coverThumbnailString));
      } catch (e) {
        return false;
      }
    }
    if (isUrl()) {
      const isImg = (this.coverThumbnailString.match(/\.(jpeg|jpg|gif|png)$/) != null);
      console.log(isImg)
      if (isImg) {
        this.coverSource = this.coverThumbnailString
        return
      }
    }
    this.coverSource = ''
    return
  }

  addThumbnailFromFile(files: FileList) {
    this.dataForm['controls']['coverUrl'].setValue(null)
    this.coverThumbnailString = ''
    if (files.length === 1) {
      let file = files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.coverSource = reader.result as string
        this.dataForm['controls']['coverFile'].setValue(files)
      };
    } else {
      this.coverSource = ''
      this.dataForm['controls']['coverFile'].setValue(null)
    }
  }

  submit() {
    const data = this.dataForm.value;
    console.log(data)
  }

//
//     labels[18].htmlFor="Covertext";
//     labels[18].innerText="Boritó (URL): ";
//     let covurl=document.createElement("input");
//     covurl.type="text";
//     covurl.id="coverurl";
//     covurl.name="cover";
//     inputlistitem[18].appendChild(labels[18]);
//     inputlistitem[18].appendChild(covurl);
//     list5.appendChild(inputlistitem[18]);
//
//     //boritóimg
//     let tn=document.createElement("img");
//     tn.id="coverthumbnail";
//     labels[19].htmlFor="cover";
//     labels[19].innerText="Borító (Kép): ";
//     let coverinput=document.createElement("input");
//     coverinput.type="file";
//     coverinput.id="cover";
//     coverinput.name="cover";
//     coverinput.addEventListener("change",()=>{
//       let file=coverinput.files[0];
//       let reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = function() {
//         tn.src=reader.result;
//       };
//     });
//
//     inputlistitem[19].appendChild(labels[19]);
//     inputlistitem[19].appendChild(coverinput);
//     inputlistitem[19].appendChild(tn);
//     list5.appendChild(inputlistitem[19]);
//
//     /*coverfs.appendChild(labels[18]);
//     coverfs.appendChild(coverinput);
//     coverfs.appendChild(tn);*/
//
//     if ((JSCORE.page=="modifybook")&&(tn.src!=="no_cover.jpg"))     //eredeti borító törlése gomb
//     {
//       let delcoverbtn=document.createElement("button");
//       delcoverbtn.innerText="Eredeti Borító törlése";
//       inputlistitem[19].appendChild(delcoverbtn);
//
//       delcoverbtn.addEventListener("click",()=>{
//
//         event.preventDefault();
//         tn.removeAttribute("src");
//       })
//     }
//
//     this.nbform.appendChild(coverfs);
//
//     let bsm=document.createElement("button");                   //submit button
//     bsm.type="submit";
//     bsm.innerText="Elküld";
//     this.nbform.appendChild(bsm);
//     if (JSCORE.page=="modifybook")
//     {
//       this.nbform.addEventListener("submit", ()=>{this.submitModifyBook()}, true);
//     }
//     if (JSCORE.page=="uploadbook")
//     {
//       this.nbform.addEventListener("submit", ()=>{this.submitBookForm()}, true);
//     }
//     this.nberror=document.createElement("span");
//     this.nberror.id="bookresspan";
//     this.nbform.appendChild(this.nberror);
//
//     if (JSCORE.page=="modifybook")                                  //törlés gomb
//     {
//       let delspan=document.createElement("span");
//       delspan.id="delspan";
//       this.nbform.appendChild(delspan);
//
//       let delanc=document.createElement("a");
//
//       delanc.innerText="Könyv törlése";
//       delspan.appendChild(delanc);
//       delspan.addEventListener("click",()=>
//       {
//         AjaxCaller.sendGetRequest("connecttodatabase",{"isbn":JSCORE.data["isbn"],"task":"deleteBook"},this.callFunctions,this.callbackfunctions["addBook"]);
//       })
//     }
//   };
//
//   static submitBookForm=function()                            //az nbfrom submit eseménye - új könyv feltöltése
//   {
//     event.preventDefault();
//     let namelist=this.nbform.querySelectorAll('[name]');
//     let ajaxdata={};
//     ajaxdata["task"]="addnewbook";
//     ajaxdata["tags"]=[];
//     let hascover=false;
//     for(let i=0; i<namelist.length;i++)
//     {
//       let nl=namelist[i];
//       if (nl.type=="text")
//       {
//         ajaxdata[nl.name]=nl.value;
//       }
//       if (nl.type=="select-one")
//       {
//         ajaxdata[nl.name]=nl.value;
//       }
//
//       if (nl.type=="textarea")
//       {
//         ajaxdata[nl.name]="";
//         if (nl.value!="")
//         {
//           var lines = nl.value.split('\n');
//           for (let j = 0; j < lines.length; j++) {
//             if (j!=lines.length-1)
//             {
//               ajaxdata[nl.name]+=(lines[j]+String.fromCharCode(13, 10))
//             }
//             else ajaxdata[nl.name]+=(lines[j])
//           }
//         }
//       }
//       if (nl.name=="tags[]")
//       {
//         if (nl.checked==true)
//         {
//           ajaxdata["tags"].push(nl.value)
//         }
//       }
//       if (nl.type=="file")
//       {
//         if (ajaxdata[nl.name]=="")
//         {
//           ajaxdata[nl.name]="";
//           if (nl.files.length!==0)
//             hascover=true;
//           if (hascover)
//           {
//             let file=nl.files[0];
//             let reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = ()=> {
//               ajaxdata[nl.name]=reader.result;
//               AjaxCaller.sendPostRequest("connecttodatabase",ajaxdata,this.callFunctions,this.callbackfunctions["addBook"])
//             };
//           }
//           else
//             ajaxdata[nl.name]="";
//         }
//       }
//
//     }
//     if (!hascover)
//       AjaxCaller.sendPostRequest("connecttodatabase",ajaxdata,this.callFunctions,this.callbackfunctions["addBook"])
//   };
//
//   static displaySubmitBookFormResult=function(res)            //nbdform hozzáad callback-je
//   {
//     console.log(res);
//     this.nberror.innerHTML="";
//     if (res[0]=="SUCC")
//     {
//       if (JSCORE.page=="uploadbook")
//       {
//         if (res[1]=="addnewbook")
//         {
//           this.nberror.innerHTML+=res[2] + "hozzáadása sikerült<br/>";
//           this.nberror.innerHTML+="A profilja megtekinthető";
//           let profillink=document.createElement("a");                            //link-re kattintva lehet újat kezdeni
//           profillink.innerText="itt";
//           profillink.href="./index.php?target=displayinduvidualbook&isbn="+res[3];
//           profillink.target="_blank";
//           this.nberror.appendChild(profillink)
//         }
//
//         let newbooklink=document.createElement("a");                            //link-re kattintva lehet újat kezdeni
//         newbooklink.innerText="Új könyv hozzáadása";
//         newbooklink.onclick=()=>{
//           location = location;};
//         this.nberror.appendChild(newbooklink)
//       }
//       if (JSCORE.page=="modifybook")
//       {
//         if (res[1]=="DELETE")
//         {
//           location="./index.php?target=modifybook"
//         }
//         else location="./index.php?target=modifybook&isbn="+res[2]
//
//       }
//
//     }
//     else if(res[0]=="ERR")
//     {
//       this.nberror.innerHTML="error:<br/> " + res[1][0]+"<br/>" + res[1][1]+"<br/>"+ res[1][2];
//     }
//     else
//     {
//       this.nberror.innerHTML="unknown error";
//     }
//   };
//
//   static fillBookFormWithData=function(res)                   //módosításnál a könyv mostani adatai lekérdeződnek és beiródnak a html input elemekbe
//   {
//     console.log(res)
//     if (res[0]==="ERR")
//     {
//       this.isbnerror.hidden=false;
//       this.isbnerror.innerHTML="A megadott ISBN nem létezik";
//     }
//     else
//     {
//       this.nbform.hidden=false;
//       this.nbdform.hidden=false;
//       if (typeof this.isbnchooser !== "undefined")
//         this.isbnchooser.hidden=true;
//       this.originaldata=res;                                    //eredeti adatok
//       console.log(res);
//
//       let texts=document.querySelectorAll("#modifyform input[type=text] ");
//
//       texts[0].value=res["Title"];
//       texts[1].value=res["Author"];
//       texts[3].value=res["ISBN"];
//       texts[4].value=res["Publisher"];
//       texts[5].value=res["Series"];
//       texts[6].value=res["Year"];
//       texts[7].value=res["Page"];
//       texts[8].value=res["Weight"];
//       texts[9].value=res["Size"];
//       texts[10].value=res["Price"]["Price"];
//       texts[11].value=res["Price"]["Discount"];
//
//       let selects=document.querySelectorAll("#modifyform select ");
//       selects[0].value=res["Type"];
//       selects[1].value=res["Category"];
//       selects[2].value=res["Targetaudience"];
//       selects[3].value=res["Language"];
//       selects[4].value=res["Format"];
//       selects[5].value=res["Price"]["Discounttype"];
//
//       document.querySelectorAll("#modifyform textarea")[0].value=res["ShortDesc"];
//
//       for (let key in res["Tags"])
//       {
//         document.getElementById("tags-"+res["Tags"][key]).checked=true;
//       }
//
//       if (res["Cover"]!="")
//       {
//         let ext=res["Cover"][0].split(".").pop();
//         if (ext=="jpg") ext='image/jpeg';
//         document.getElementById("coverthumbnail").src="data:"+ext+";base64,"+res["Cover"][1];
//       }
//     }
//   };
//
//   static submitModifyBook=function()
//   {
//     console.log(this)
//     //nbdform módositás submit eseménye - összegyüjti az adatokat és továbbküldi feldolgozásra checkAjaxDatának
//     event.preventDefault();
//
//     let namelist=this.nbform.querySelectorAll('[name]');
//     let ajaxdata={};
//     ajaxdata["tags"]=[];
//     let hascover=false;
//
//
//
//     for(let i=0; i<namelist.length;i++)
//     {
//       let nl=namelist[i];
//
//       if (nl.type=="text")
//       {
//         ajaxdata[nl.name]=nl.value;
//       }
//       if (nl.type=="select-one")
//       {
//         ajaxdata[nl.name]=nl.value;
//       }
//
//       if (nl.type=="textarea")
//       {
//         ajaxdata[nl.name]="";
//         if (nl.value!="")
//         {
//           var lines = nl.value.split('\n');
//           for (let j = 0; j < lines.length; j++) {
//
//             if (j!=lines.length-1)
//             {
//               ajaxdata[nl.name]+=(lines[j]+String.fromCharCode(13, 10));
//             }
//             else ajaxdata[nl.name]+=(lines[j]);
//           }
//         }
//       }
//       if (nl.name=="tags[]")
//       {
//         if (nl.checked==true)
//         {
//           ajaxdata["tags"].push(nl.value);
//         }
//       }
//       if (nl.type=="file")
//       {
//         ajaxdata[nl.name]="";
//         if (nl.files.length!==0)
//           hascover=true;
//         if (hascover)
//         {
//           console.log(nl.files[0]);
//           let file=nl.files[0];
//           let reader = new FileReader();
//           reader.readAsDataURL(file);
//           reader.onload = () =>{
//             ajaxdata[nl.name]=reader.result;
//             console.log(ajaxdata[nl.name]);
//             this.checkAjaxdata(ajaxdata)  //ha van borító csak akkor küldi el, ha betöltődött
//           };
//         }
//         else
//           ajaxdata[nl.name]="";
//       }
//     }
//     let coverurl=document.getElementById("coverurl")
//
//     if (coverurl.value!=="")
//     {
//       ajaxdata["cover"]=coverurl.value;
//     }
//     if (!hascover)
//       this.checkAjaxdata(ajaxdata);
//   };
//
//   static checkAjaxdata=function(ajaxdata)     //adatmódosításnál összehasonlítja a régi és új adatokat, ami különbözik elküldi feldolgozsra a szervernek.
//   {
//     console.log(ajaxdata);
//     let temptags=ajaxdata["tags"];
//     for (let key in temptags)
//     {
//       temptags[key]=parseInt(temptags[key]);
//     }
//
//     console.log(temptags);
//     let key2;
//     for (let key in ajaxdata)
//     {
//       if (key=="isbn")
//       {
//         key2="ISBN"
//       }
//       else if(key=="targateaud")
//       {
//         key2="Targetaudience"
//       }
//       else if(key=="targetaud")
//       {
//         key2="Targetaudience"
//       }
//       else if(key=="desc")
//       {
//         key2="ShortDesc"
//       }
//       else
//       {
//         key2=key.charAt(0).toUpperCase() + key.slice(1);
//       }
//
//       if (ajaxdata[key]==this.originaldata[key2])
//       {
//         delete ajaxdata[key];
//       }
//       else
//       {
//         if (key=="tags")
//         {
//
//           if (this.originaldata[key2]!=='')
//           {
//             this.originaldata[key2].sort(function(a, b){return a-b});
//             temptags.sort(function(a, b){return a-b});
//             if (JSON.stringify(this.originaldata[key2])==JSON.stringify(temptags))
//             {
//               delete ajaxdata[key];
//             }
//           }
//         }
//
//         if (key=="price")
//         {
//           if (ajaxdata[key]==this.originaldata[key2]["Price"])
//           {
//             delete ajaxdata[key];
//           }
//         }
//
//         if (key=="discount")
//         {
//           if (ajaxdata[key]==this.originaldata["Price"]["Discount"])
//           {
//             delete ajaxdata[key];
//           }
//         }
//         if (key=="discounttype")
//         {
//           if (ajaxdata[key]==this.originaldata["Price"]["Discounttype"])
//           {
//             delete ajaxdata[key];
//           }
//         }
//
//         if (key=="cover")
//         {
//           console.log(this.originaldata[key2][0]);
//           if (ajaxdata[key]=="")
//           {
//             delete ajaxdata[key];
//           }
//         }
//       }
//     }
//
//     if ((JSCORE.page=="modifybook")&&(document.getElementById("coverthumbnail").src=="")&&(this.originaldata["Cover"][0]!="no_cover.jpg"))
//     {
//       ajaxdata["cover"]="";
//     }
//     console.log(ajaxdata)
//     if (Object.keys(ajaxdata).length === 0)
//     {
//       let result=["ERR",["Nincs változás az adatokban","",""]];
//       this.displaySubmitBookFormResult(result)
//     }
//     else
//     {
//       ajaxdata["task"]="modifybook";
//       if (JSCORE.data["isbn"]!==undefined)
//       {
//         ajaxdata["originalisbn"]=JSCORE.data["isbn"];
//       }
//       else if (document.getElementById("isbn").value!=="")
//         ajaxdata["originalisbn"]=document.getElementById("isbn").value;
//       AjaxCaller.sendPostRequest("connecttodatabase",ajaxdata,this.callFunctions,this.callbackfunctions["addBook"]);
//     }
//   };
//
//   static createISBNChooser=function()
//   {
//     htmlElementCreator.createHtmlElement("header",this.isbnchooser,{"innerHTML":"Könyv adatainak módosítása"})
//     let sect=htmlElementCreator.createHtmlElement("section",this.isbnchooser,{"id":"choosersect"})
//     htmlElementCreator.createHtmlElement("label",sect,{"for":"isbntext","innerHTML":"Írja be az ISBN számot:"})
//     let isbntext=htmlElementCreator.createHtmlElement("input",sect,{"type":"text","id":"isbntext"})
//     let isbnsearchbutton=htmlElementCreator.createHtmlElement("input",sect,{"type":"button","id":"isbnsearchbutton","value":"Keresés"})
//     this.isbnerror=htmlElementCreator.createHtmlElement("span",this.isbnchooser,{"id":"isbnerror"})
//
//     isbnsearchbutton.addEventListener("click",()=>{
//       console.log(isbntext.value)
//       AjaxCaller.sendGetRequest("connecttodatabase",{"isbn":isbntext.value,"task":"getInduvidBookMeta"},this.callFunctions,this.callbackfunctions["getbookdata"]);
//     })
//   }
// }

}
