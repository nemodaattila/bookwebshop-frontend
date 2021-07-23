import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaSelectWithOptionGroupComponent} from './criteria-select-with-option-group.component';

describe('CriteriaSelectWithOptionGroupComponent', () => {
  let component: CriteriaSelectWithOptionGroupComponent;
  let fixture: ComponentFixture<CriteriaSelectWithOptionGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaSelectWithOptionGroupComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaSelectWithOptionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
