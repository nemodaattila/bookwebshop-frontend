import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPrimaryDataDisplayerComponent } from './book-primary-data-displayer.component';

describe('BookPrimaryDataDisplayerComponent', () => {
  let component: BookPrimaryDataDisplayerComponent;
  let fixture: ComponentFixture<BookPrimaryDataDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPrimaryDataDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPrimaryDataDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
