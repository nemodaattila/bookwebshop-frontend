import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNavigatorComponent} from './page-navigator.component';

describe('PageNavigatorComponent', () => {
  let component: PageNavigatorComponent;
  let fixture: ComponentFixture<PageNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNavigatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
