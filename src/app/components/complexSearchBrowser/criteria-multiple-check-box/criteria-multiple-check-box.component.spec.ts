import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaMultipleCheckBoxComponent} from './criteria-multiple-check-box.component';

describe('CriteriaMultipleTagComponent', () => {
  let component: CriteriaMultipleCheckBoxComponent;
  let fixture: ComponentFixture<CriteriaMultipleCheckBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaMultipleCheckBoxComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaMultipleCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
