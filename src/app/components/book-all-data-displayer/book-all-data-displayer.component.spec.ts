import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookAllDataDisplayerComponent} from './book-all-data-displayer.component';

describe('BookAllDataDisplayerComponent', () => {
  let component: BookAllDataDisplayerComponent;
  let fixture: ComponentFixture<BookAllDataDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAllDataDisplayerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAllDataDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
