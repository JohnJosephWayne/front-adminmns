import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModelUserComponent } from './edit_model-user.component';

describe('ModelUserComponent', () => {
  let component: EditModelUserComponent;
  let fixture: ComponentFixture<EditModelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModelUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
