import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookSpecificDataAdderComponent} from './book-specific-data-adder.component';

describe('BookSpecificDataAdderComponent', () => {
  let component: BookSpecificDataAdderComponent;
  let fixture: ComponentFixture<BookSpecificDataAdderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookSpecificDataAdderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSpecificDataAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
