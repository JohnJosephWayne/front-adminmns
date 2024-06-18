import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotLatenessComponent } from './depot-retard.component';

describe('DepotLatenessComponent', () => {
  let component: DepotLatenessComponent;
  let fixture: ComponentFixture<DepotLatenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepotLatenessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotLatenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
