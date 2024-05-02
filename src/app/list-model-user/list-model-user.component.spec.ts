import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModelUserComponent } from './list-model-user.component';

describe('ListModelUserComponent', () => {
  let component: ListModelUserComponent;
  let fixture: ComponentFixture<ListModelUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListModelUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListModelUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
