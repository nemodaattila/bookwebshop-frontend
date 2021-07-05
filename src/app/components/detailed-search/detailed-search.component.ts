import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detailed-search',
  templateUrl: './detailed-search.component.html',
  styleUrls: ['./detailed-search.component.css']
})
export class DetailedSearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
