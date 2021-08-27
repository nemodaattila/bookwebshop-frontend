import {BookData} from "./book-data";

export class BookDataComparator extends BookData {

  compare(newData: { [index: string]: any }): { [index: string]: any } {
    let comparedData: { [index: string]: any } = {}
    comparedData.originalIsbn = this.getIsbn()
    comparedData.originalCoverDelete = newData['originalCoverDelete']
    let book = Object.entries(this)
    let newBookKeys = Object.keys(newData)
    // if (!newData['year']) newData['year']='' check backend null + weight
    if (!newData['price']) newData['price'] = 0
    for (let [name, value] of book) {
      if (newBookKeys.find((value) => value === name) !== undefined) {
        if (value != newData[name]) {
          switch (name) {
            case 'author':
              if (Object.values(value).sort().toString() !== newData[name])
                comparedData[name] = newData[name];
              break
            case 'discountType':
              if (Number(Object.keys(value)[0]) != newData[name])
                comparedData[name] = newData[name];
              break
            case 'tags':
              console.log([Object.values(value).toString(), newData[name]])
              if (Object.values(value).toString() !== newData[name]) {
                let o = Object.values(value)
                let n = newData[name].split(',')
                console.log([o.filter(x => !n.includes(x)), n.filter((x: unknown) => !o.includes(x))])
                comparedData[name] = [o.filter(x => !n.includes(x)), n.filter((x: unknown) => !o.includes(x))];
              }
              break
            default:
              comparedData[name] = newData[name];
          }
        }
      } else {
        switch (name) {
          case 'typeId': {
            if (value !== newData['type'])
              comparedData['type'] = newData['type'];
            break
          }
          case 'categoryId': {
            if (value != newData['category'])
              comparedData['category'] = newData['category'];
            break
          }
          case 'pageNumber': {
            if (value != newData['page'])
              comparedData['page'] = newData['page'];
            break
          }
          case 'languageId': {
            if (value != newData['language'])
              comparedData['language'] = newData['language'];
            break
          }
          case 'physicalSize': {
            if (value != newData['size'])
              comparedData['size'] = newData['size'];
            break
          }
          case 'shortDescription': {
            if (value != newData['description'])
              comparedData['description'] = newData['description'];
            break
          }
          case 'targetAudienceId': {
            if (value != newData['targetAudience'])
              comparedData['targetAudience'] = newData['targetAudience'];
            break
          }
          case 'coverThumbnail': {
            if (newData['coverUrl'])
              comparedData['coverUrl'] = newData['coverUrl']
            if (newData['coverFile']) {
              if (newData['coverFile'] !== this.getCover()) {
                comparedData['coverFile'] = newData['coverFile']
              } else
                comparedData.originalCoverDelete = false
            }
            break
          }
        }
      }
    }
    return comparedData

  }
}
