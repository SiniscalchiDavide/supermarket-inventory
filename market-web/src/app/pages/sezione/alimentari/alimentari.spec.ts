import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alimentari } from './alimentari';

describe('Alimentari', () => {
  let component: Alimentari;
  let fixture: ComponentFixture<Alimentari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Alimentari],
    }).compileComponents();

    fixture = TestBed.createComponent(Alimentari);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
