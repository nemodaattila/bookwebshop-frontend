import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualBookPrimaryDataDisplayerComponent } from './individual-book-primary-data-displayer.component';

describe('InduvidualBookPrimaryDataDisplayeComponent', () => {
  let component: IndividualBookPrimaryDataDisplayerComponent;
  let fixture: ComponentFixture<IndividualBookPrimaryDataDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualBookPrimaryDataDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualBookPrimaryDataDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
