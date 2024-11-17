import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOldOrdersComponent } from './admin-old-orders.component';

describe('AdminOldOrdersComponent', () => {
  let component: AdminOldOrdersComponent;
  let fixture: ComponentFixture<AdminOldOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOldOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOldOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
