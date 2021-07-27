import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GlobalMessageDisplayerComponent} from './global-message-displayer.component';

describe('GlobalMessageDiplayerComponent', () => {
  let component: GlobalMessageDisplayerComponent;
  let fixture: ComponentFixture<GlobalMessageDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalMessageDisplayerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
