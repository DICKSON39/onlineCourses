import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersOnlyComponent } from './teachers-only.component';

describe('TeachersOnlyComponent', () => {
  let component: TeachersOnlyComponent;
  let fixture: ComponentFixture<TeachersOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeachersOnlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TeachersOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
