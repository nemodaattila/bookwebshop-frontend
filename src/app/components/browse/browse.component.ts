import { Component, OnInit } from '@angular/core';
import {BookSearchService} from "../../services/book-search.service";
import {LocalLibraryService} from "../../services/local-library.service";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  constructor( private searchEngine: BookSearchService,
              ) { }

  ngOnInit(): void {
  }

}
