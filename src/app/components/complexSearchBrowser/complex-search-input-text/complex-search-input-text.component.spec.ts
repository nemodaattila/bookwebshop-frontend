import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexSearchInputTextComponent } from './complex-search-input-text.component';

describe('ComplexSearchInputTextComponent', () => {
  let component: ComplexSearchInputTextComponent;
  let fixture: ComponentFixture<ComplexSearchInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplexSearchInputTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexSearchInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
