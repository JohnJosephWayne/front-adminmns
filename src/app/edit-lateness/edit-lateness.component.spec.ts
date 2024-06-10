import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLatenessComponent } from './edit-lateness.component';

describe('EditLatenessComponent', () => {
  let component: EditLatenessComponent;
  let fixture: ComponentFixture<EditLatenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLatenessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLatenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
