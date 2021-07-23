import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookThemeCategoryBrowserComponent} from './book-theme-category-browser.component';

describe('BookThemeCategoryBrowserComponent', () => {
  let component: BookThemeCategoryBrowserComponent;
  let fixture: ComponentFixture<BookThemeCategoryBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookThemeCategoryBrowserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookThemeCategoryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
