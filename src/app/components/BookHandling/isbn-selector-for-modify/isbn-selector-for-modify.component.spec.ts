import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IsbnSelectorForModifyComponent} from './isbn-selector-for-modify.component';

describe('IsbnSelectorForModifyComponent', () => {
  let component: IsbnSelectorForModifyComponent;
  let fixture: ComponentFixture<IsbnSelectorForModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsbnSelectorForModifyComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsbnSelectorForModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
