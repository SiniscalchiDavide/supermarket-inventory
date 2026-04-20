import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Giocattoli } from './giocattoli';

describe('Giocattoli', () => {
  let component: Giocattoli;
  let fixture: ComponentFixture<Giocattoli>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Giocattoli],
    }).compileComponents();

    fixture = TestBed.createComponent(Giocattoli);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
