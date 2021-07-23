import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CriteriaSelectorComponent} from './criteria-selector.component';

describe('CriteriaSelectorComponent', () => {
  let component: CriteriaSelectorComponent;
  let fixture: ComponentFixture<CriteriaSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaSelectorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
