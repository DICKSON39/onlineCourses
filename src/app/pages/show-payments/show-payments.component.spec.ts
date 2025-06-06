import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaymentsComponent } from './show-payments.component';

describe('ShowPaymentsComponent', () => {
  let component: ShowPaymentsComponent;
  let fixture: ComponentFixture<ShowPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPaymentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
