import {Component} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})

/**
 * parent component for browsing books by category, on multiple pages
 * item/page count, order changeable
 */
export class BrowseComponent {

  /**
   * event subject for resetting the pageNavigator's actual page to 0
   * passed down to page-navigator component
   */
  public pageNavResetRequestSent: Subject<boolean> = new Subject();

  /**
   * subject trigger function for page navigator reset
   */
  pageNavReset() {
    this.pageNavResetRequestSent.next(true);
  }

}
