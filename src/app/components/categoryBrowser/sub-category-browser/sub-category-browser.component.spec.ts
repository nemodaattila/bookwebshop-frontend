import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryBrowserComponent } from './sub-category-browser.component';

describe('SubCategoryBrowserComponent', () => {
  let component: SubCategoryBrowserComponent;
  let fixture: ComponentFixture<SubCategoryBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCategoryBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
