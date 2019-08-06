import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSubmitComponent } from './credit-card-submit.component';

describe('CreditCardSubmitComponent', () => {
  let component: CreditCardSubmitComponent;
  let fixture: ComponentFixture<CreditCardSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditCardSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
