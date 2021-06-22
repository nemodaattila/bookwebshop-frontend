import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InduvidualBookPrimaryDataDisplayerComponent } from './induvidual-book-primary-data-displayer.component';

describe('InduvidualBookPrimaryDataDisplayeComponent', () => {
  let component: InduvidualBookPrimaryDataDisplayerComponent;
  let fixture: ComponentFixture<InduvidualBookPrimaryDataDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InduvidualBookPrimaryDataDisplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InduvidualBookPrimaryDataDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
