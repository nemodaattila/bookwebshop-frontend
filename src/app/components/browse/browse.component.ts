import {Component, OnInit, ViewChild} from '@angular/core';
import {BookSearchService} from "../../services/book-search.service";
import {LocalLibraryService} from "../../services/local-library.service";
import {PageNavigatorComponent} from "../page-navigator/page-navigator.component";
import {Subject} from "rxjs";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {

  constructor() { }

  public pageNavResetRequestSent: Subject<boolean> = new Subject();

  ngOnInit(): void {
  }

  pageNavReset()
  {
      console.log('pnreset');
      this.pageNavResetRequestSent.next(true);
  }

}
