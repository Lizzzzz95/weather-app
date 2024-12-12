import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherLandingComponent } from './weather-landing.component';
import { WeatherLandingService } from './weather-landing.service';

describe('WeatherLandingComponent', () => {
  let component: WeatherLandingComponent;
  let fixture: ComponentFixture<WeatherLandingComponent>;
  let mockWeatherLandingService = {
    getForecast: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherLandingComponent],
      providers: [
        {
          provide: WeatherLandingService,
          useValue: mockWeatherLandingService,
        },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(component.formGroup.get('latitude')?.value).toEqual(0);
  });

  it('should submit form if valid', () => {
    component.formGroup.get('latitude')?.setValue(0);
    component.formGroup.get('longitude')?.setValue(0);
    component.onSubmit();
    expect(component.errorMessage).toBeNull();
  });

  it('should not submit form if invalid', () => {
    component.formGroup.get('latitude')?.setValue(0);
    component.formGroup.get('longitude')?.setValue('test');
    component.onSubmit();
    expect(component.errorMessage).not.toBeNull();
  });
});
