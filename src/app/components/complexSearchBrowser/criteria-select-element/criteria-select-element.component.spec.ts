import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaSelectElementComponent} from './criteria-select-element.component';

describe('CriteriaSelectElementComponent', () => {
  let component: CriteriaSelectElementComponent;
  let fixture: ComponentFixture<CriteriaSelectElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaSelectElementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaSelectElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
