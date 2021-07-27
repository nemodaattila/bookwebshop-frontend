import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GlobalMessageDiplayerComponent} from './global-message-diplayer.component';

describe('GlobalMessageDiplayerComponent', () => {
  let component: GlobalMessageDiplayerComponent;
  let fixture: ComponentFixture<GlobalMessageDiplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalMessageDiplayerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageDiplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
