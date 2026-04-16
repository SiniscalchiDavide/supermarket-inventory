import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Componenti } from './componenti';

describe('Componenti', () => {
  let component: Componenti;
  let fixture: ComponentFixture<Componenti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Componenti],
    }).compileComponents();

    fixture = TestBed.createComponent(Componenti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
