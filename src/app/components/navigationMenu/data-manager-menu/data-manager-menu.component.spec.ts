import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataManagerMenuComponent} from './data-manager-menu.component';

describe('DataManagerMenuComponent', () => {
  let component: DataManagerMenuComponent;
  let fixture: ComponentFixture<DataManagerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataManagerMenuComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
