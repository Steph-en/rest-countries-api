import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [], // Remove AppComponent from the declarations array
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme correctly', () => {
    spyOn(component, 'initializeTheme');
    component.ngOnInit();
    expect(component.initializeTheme).toHaveBeenCalled();
  });

  // it('should toggle theme correctly', () => {
  //   const documentElement = document.documentElement;
  //   spyOn(documentElement.classList, 'toggle').and.returnValue(true);

  //   // Light theme initially
  //   component.toggle();
  //   expect(documentElement.classList.toggle).toHaveBeenCalledWith('dark');
  //   expect(localStorage.getItem('theme')).toEqual('dark');

  //   // Dark theme initially
  // });

  it('should toggle to dark theme', () => {
    const documentElement = document.documentElement;
    spyOn(documentElement.classList, 'toggle').and.returnValue(true);

    component.toggle();
    expect(documentElement.classList.toggle).toHaveBeenCalledWith('dark');
    expect(localStorage.getItem('theme')).toEqual('dark');
  })
  
  it('should call toggle method when button is clicked', () => {
    spyOn(component, 'toggle');
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    buttonElement.click();
    expect(component.toggle).toHaveBeenCalled();
  });
});
