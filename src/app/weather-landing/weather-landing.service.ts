import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherLandingService {
  private _url: string = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  public getForecast(latitude: number, longitude: number): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude);
    return this.http.get<any>(this._url, { params }).pipe((data) => data);
  }
}
