import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherApiResponse } from './models/weather-api-response.model';
import { WeatherLandingService } from './weather-landing.service';

describe('WeatherLandingService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: WeatherLandingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(WeatherLandingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getForecast', () => {
    let weatherApiResponse: WeatherApiResponse = {
      daily: {
        apparent_temperature_max: [],
        apparent_temperature_min: [],
        time: [],
      },
      daily_units: {
        apparent_temperature_max: '',
        apparent_temperature_min: '',
        time: '',
      },
      elevation: '',
      generationtime_ms: 0,
      latitude: 0,
      longitude: 0,
      timezone: '',
      timezone_abbreviation: '',
    };

    httpClientSpy.get.and.returnValue(of(weatherApiResponse));
    service.getForecast(0, 0).subscribe({
      next: (res) => {
        expect(res).toEqual({ weather: [] });
      },
    });
  });
});
