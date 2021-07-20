import {Component} from "@angular/core";
import {BookMetaDataService} from "./services/book/book-meta-data.service";
import {BookSearchService} from "./services/book/book-search.service";
import {LocalLibraryService} from "./services/book/local-library.service";
import {AuthenticationService} from "./services/user/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BookWebShopFrontend';

  constructor(private metaService: BookMetaDataService, private bookSearch: BookSearchService,
              private localLibrary: LocalLibraryService, private authService: AuthenticationService) {
  }
}
