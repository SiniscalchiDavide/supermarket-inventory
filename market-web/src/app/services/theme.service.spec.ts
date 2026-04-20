import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Pulisce il localStorage prima di ogni test
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme and save to localStorage', () => {
    // Assumiamo che parta come light (dipende dal sistema, quindi forziamo prima a light)
    localStorage.setItem('theme-preference', 'light');
    document.documentElement.removeAttribute('data-theme');
    
    service.toggleTheme();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme-preference')).toBe('dark');
    
    service.toggleTheme();
    
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(localStorage.getItem('theme-preference')).toBe('light');
  });
});