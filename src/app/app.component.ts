import {Component} from "@angular/core";
import {BookMetaDataService} from "./services/book/book-meta-data.service";
import {BookSearchService} from "./services/book/book-search.service";
import {LocalLibraryService} from "./services/book/local-library.service";
import {UserService} from "./services/authentication/user.service";
import {TestService} from "./services/test.service";
import {GlobalMessageDisplayerService} from "./services/helper/global-message-displayer.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookWebShopFrontend';

  constructor(private metaService: BookMetaDataService, private bookSearch: BookSearchService,
              private localLibrary: LocalLibraryService, private userService: UserService) {
  }
}
