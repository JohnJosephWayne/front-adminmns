import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccueilAdministratifComponent} from './accueil.component';

describe('AccueilComponent', () => {
  let component: AccueilAdministratifComponent;
  let fixture: ComponentFixture<AccueilAdministratifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilAdministratifComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccueilAdministratifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
