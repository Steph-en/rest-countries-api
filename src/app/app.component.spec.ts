import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule,
        HomeComponent,
        FontAwesomeModule,
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'rest-countries-api' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rest-countries-api');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, rest-countries-api');
  });

  it('should toggle theme and save to localStorage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(localStorage, 'setItem');
    
    app.toggle();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    app.toggle();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('should initialize theme from localStorage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'theme' ? 'dark' : null;
    });

    app.initializeTheme();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should not have dark theme by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'theme' ? 'light' : null;
    });

    app.initializeTheme();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
