import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaInputTextComponent} from './criteria-input-text.component';

describe('ComplexSearchInputTextComponent', () => {
  let component: CriteriaInputTextComponent;
  let fixture: ComponentFixture<CriteriaInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaInputTextComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
