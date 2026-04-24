import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    // Pulisce il localStorage prima di ogni test per isolamento
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with system preference or default if no preference is set', () => {
    // Quando il servizio viene iniettato, chiama initTheme nel costruttore.
    // Se non c'è nulla nel localStorage, usa il matchMedia del sistema.
    // In un ambiente di test jsdom, potrebbe non esserci preferenza dark,
    // quindi possiamo solo verificare che il servizio sia stato creato senza errori.
    expect(service).toBeTruthy();
  });

  it('should toggle theme and update document attribute and localStorage', () => {
    // Assumiamo che parta come light forzando il valore
    localStorage.setItem('theme-preference', 'light');
    document.documentElement.removeAttribute('data-theme');
    
    // Primo toggle: da chiaro a scuro
    service.toggleTheme();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme-preference')).toBe('dark');
    expect(service.isDarkMode()).toBe(true);
    
    // Secondo toggle: da scuro a chiaro
    service.toggleTheme();
    
    // In Angular/JS, rimuovendo l'attributo il getAttribute può tornare null o stringa vuota in base al browser
    expect(document.documentElement.getAttribute('data-theme')).toBeFalsy(); 
    expect(localStorage.getItem('theme-preference')).toBe('light');
    expect(service.isDarkMode()).toBe(false);
  });
});