import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaSelectInputComponent } from './criteria-select-input.component';

describe('CriteriaSelectInputComponent', () => {
  let component: CriteriaSelectInputComponent;
  let fixture: ComponentFixture<CriteriaSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriteriaSelectInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
