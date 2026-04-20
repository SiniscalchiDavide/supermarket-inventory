import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Elettronica } from './elettronica';

describe('Elettronica', () => {
  let component: Elettronica;
  let fixture: ComponentFixture<Elettronica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Elettronica],
    }).compileComponents();

    fixture = TestBed.createComponent(Elettronica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
