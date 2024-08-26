import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationLatenessComponent } from './validation-lateness.component';

describe('ValidationLatenessComponent', () => {
  let component: ValidationLatenessComponent;
  let fixture: ComponentFixture<ValidationLatenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationLatenessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationLatenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
