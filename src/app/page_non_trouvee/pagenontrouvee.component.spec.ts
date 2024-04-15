import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNonTrouveeComponent} from './pagenontrouvee.component';

describe('PagenontrouveeComponent', () => {
  let component: PageNonTrouveeComponent;
  let fixture: ComponentFixture<PageNonTrouveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNonTrouveeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageNonTrouveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
