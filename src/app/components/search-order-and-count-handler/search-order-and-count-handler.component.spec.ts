import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchOrderAndCountHandlerComponent} from './search-order-and-count-handler.component';

describe('SearchOrderAndCountHandlerComponent', () => {
  let component: SearchOrderAndCountHandlerComponent;
  let fixture: ComponentFixture<SearchOrderAndCountHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchOrderAndCountHandlerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOrderAndCountHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
