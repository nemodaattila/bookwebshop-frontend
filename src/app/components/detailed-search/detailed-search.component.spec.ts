import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailedSearchComponent} from './detailed-search.component';

describe('DetailedSearchComponent', () => {
  let component: DetailedSearchComponent;
  let fixture: ComponentFixture<DetailedSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedSearchComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
