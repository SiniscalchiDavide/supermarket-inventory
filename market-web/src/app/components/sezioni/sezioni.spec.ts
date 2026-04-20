import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Sezioni } from './sezioni';

describe('Sezioni', () => {
  let component: Sezioni;
  let fixture: ComponentFixture<Sezioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sezioni],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sezioni);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
