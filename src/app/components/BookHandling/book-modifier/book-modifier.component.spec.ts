import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookModifierComponent} from './book-modifier.component';

describe('BookModifierComponent', () => {
  let component: BookModifierComponent;
  let fixture: ComponentFixture<BookModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookModifierComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
