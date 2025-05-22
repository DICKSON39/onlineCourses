import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidClassComponent } from './paid-class.component';

describe('PaidClassComponent', () => {
  let component: PaidClassComponent;
  let fixture: ComponentFixture<PaidClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaidClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
