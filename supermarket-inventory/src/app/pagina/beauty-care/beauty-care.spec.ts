import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyCare } from './beauty-care';

describe('BeautyCare', () => {
  let component: BeautyCare;
  let fixture: ComponentFixture<BeautyCare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeautyCare],
    }).compileComponents();

    fixture = TestBed.createComponent(BeautyCare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
