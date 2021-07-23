import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainCategoryBrowserComponent} from './main-category-browser.component';

describe('MainCategoryBrowserComponent', () => {
  let component: MainCategoryBrowserComponent;
  let fixture: ComponentFixture<MainCategoryBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainCategoryBrowserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCategoryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
