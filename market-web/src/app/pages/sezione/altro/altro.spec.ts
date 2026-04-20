import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Altro } from './altro';

describe('Altro', () => {
  let component: Altro;
  let fixture: ComponentFixture<Altro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Altro],
    }).compileComponents();

    fixture = TestBed.createComponent(Altro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
