import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClassVideoComponent } from './view-class-video.component';

describe('ViewClassVideoComponent', () => {
  let component: ViewClassVideoComponent;
  let fixture: ComponentFixture<ViewClassVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewClassVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewClassVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
