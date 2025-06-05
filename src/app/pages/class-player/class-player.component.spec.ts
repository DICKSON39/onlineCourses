import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassPlayerComponent } from './class-player.component';

describe('ClassPlayerComponent', () => {
  let component: ClassPlayerComponent;
  let fixture: ComponentFixture<ClassPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
