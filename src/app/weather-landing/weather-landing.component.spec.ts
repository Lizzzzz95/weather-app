import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLandingComponent } from './weather-landing.component';
import { WeatherLandingService } from './weather-landing.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

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

  it('should submit form', () => {
    component.onSubmit();
    // TODO: use spy obj for mock service and test if api has been called for onSubmit
  });
});
