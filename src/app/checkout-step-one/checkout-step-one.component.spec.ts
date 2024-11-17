import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStepOneComponent } from './checkout-step-one.component';

describe('CheckoutStepOneComponent', () => {
  let component: CheckoutStepOneComponent;
  let fixture: ComponentFixture<CheckoutStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutStepOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
