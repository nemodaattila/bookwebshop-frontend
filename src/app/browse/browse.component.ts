import { Component, OnInit } from '@angular/core';
import {BookMetaDataService} from "../services/book-meta-data.service";
import {BookSearchService} from "../services/book-search.service";
import {LocalLibraryService} from "../services/local-library.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor(private bookMeta: BookMetaDataService, private searchEngine: BookSearchService,
              private localLibrary: LocalLibraryService) { }

  ngOnInit(): void {
  }

}
