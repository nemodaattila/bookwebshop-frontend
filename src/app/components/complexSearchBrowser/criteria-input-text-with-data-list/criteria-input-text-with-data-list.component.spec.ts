import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaInputTextWithDataListComponent} from './criteria-input-text-with-data-list.component';

describe('CriteriaInputTextWithDataListComponent', () => {
  let component: CriteriaInputTextWithDataListComponent;
  let fixture: ComponentFixture<CriteriaInputTextWithDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaInputTextWithDataListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaInputTextWithDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
