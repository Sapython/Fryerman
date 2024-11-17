import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepTwoComponent } from './checkout-step-two.component';

describe('CheckoutStepTwoComponent', () => {
  let component: CheckoutStepTwoComponent;
  let fixture: ComponentFixture<CheckoutStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
