import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOnlyComponent } from './student-only.component';

describe('StudentOnlyComponent', () => {
  let component: StudentOnlyComponent;
  let fixture: ComponentFixture<StudentOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentOnlyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
