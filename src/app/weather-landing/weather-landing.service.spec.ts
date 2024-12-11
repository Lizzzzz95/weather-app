import { TestBed } from '@angular/core/testing';

import { WeatherLandingService } from './weather-landing.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
    httpClientSpy.get.and.returnValue(of({}));
    service.getForecast(0, 0).subscribe({
      next: (res) => {
        expect(res).toEqual({});
      },
    });
  });
});
