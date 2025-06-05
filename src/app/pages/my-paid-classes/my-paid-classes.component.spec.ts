import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPaidClassesComponent } from './my-paid-classes.component';

describe('MyPaidClassesComponent', () => {
  let component: MyPaidClassesComponent;
  let fixture: ComponentFixture<MyPaidClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPaidClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPaidClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
