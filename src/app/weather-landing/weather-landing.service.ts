import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { openMeteoUrl } from './models/constants';
import { WeatherApiMapped } from './models/weather-api-mapped.model';
import { WeatherApiResponse } from './models/weather-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherLandingService {
  private _url: string = openMeteoUrl;

  constructor(private _http: HttpClient) {}

  public getForecast(
    latitude: number,
    longitude: number
  ): Observable<WeatherApiMapped> {
    const params: HttpParams = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('daily', 'apparent_temperature_min,apparent_temperature_max')
      .set('forecast_days', 6);

    return this._http
      .get<WeatherApiResponse>(this._url, { params })
      .pipe(map((data: WeatherApiResponse) => this._mapper(data)));
  }

  private _mapper(response: WeatherApiResponse): WeatherApiMapped {
    let newRes: WeatherApiMapped = {
      weather: [],
    };
    for (let i = 1; i < response.daily.apparent_temperature_max.length; i++) {
      newRes.weather.push({
        minTemp: response.daily.apparent_temperature_min[i],
        maxTemp: response.daily.apparent_temperature_max[i],
        date: response.daily.time[i],
      });
    }
    return newRes;
  }
}
