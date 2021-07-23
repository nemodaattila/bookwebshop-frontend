import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaInputNumberComponent} from './criteria-input-number.component';

describe('CriteriaInputNumberComponent', () => {
  let component: CriteriaInputNumberComponent;
  let fixture: ComponentFixture<CriteriaInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaInputNumberComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
