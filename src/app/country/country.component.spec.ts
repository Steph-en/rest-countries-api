import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountryComponent } from './country.component';
import { Interface } from '../interface/interface';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('CountryComponent', () => {
  let component: CountryComponent;
  let fixture: ComponentFixture<CountryComponent>;

  const mockCountry: Interface = {
    name: {
      common: 'Country1', official: 'Official Country1',
      nativeName: {}
    },
    cca3: 'C1',
    region: 'Region1',
    population: 1000000,
    capital: 'Capital1',
    flags: {
      svg: 'https://flag.url',
      png: '',
      alt: ''
    },
    subregion: '',
    tld: '',
    languages: {},
    currencies: {},
    borders: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        CountryComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should correctly bind @Input interfaceForm and render content', () => {
    component.interfaceForm = mockCountry;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.country')?.textContent).toContain('Official Country1');
    expect(compiled.querySelector('.population')?.textContent).toContain('Population: 1000000');
    expect(compiled.querySelector('.region')?.textContent).toContain('Region: Region1');
    expect(compiled.querySelector('.capital')?.textContent).toContain('Capital: Capital1');

    const flagElement = compiled.querySelector('.flag') as HTMLElement;
    expect(flagElement.style.backgroundImage).toContain('https://flag.url');
  });

  it('should have correct routerLink', () => {
    component.interfaceForm = mockCountry;
    fixture.detectChanges();

    const anchorElement = fixture.debugElement.nativeElement.querySelector('a');
    const routerLink = anchorElement.getAttribute('ng-reflect-router-link');

    expect(routerLink).toBe('/details/Country1');
  });
});
