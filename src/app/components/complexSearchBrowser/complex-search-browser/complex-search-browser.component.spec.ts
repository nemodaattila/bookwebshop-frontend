import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ComplexSearchBrowserComponent} from './complex-search-browser.component';

describe('ComplexSearchBrowserComponent', () => {
  let component: ComplexSearchBrowserComponent;
  let fixture: ComponentFixture<ComplexSearchBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplexSearchBrowserComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexSearchBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
