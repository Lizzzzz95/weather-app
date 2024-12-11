import { Component, OnInit } from '@angular/core';
import { WeatherLandingService } from './weather-landing.service';

@Component({
  selector: 'app-weather-landing',
  standalone: true,
  imports: [],
  templateUrl: './weather-landing.component.html',
  styleUrl: './weather-landing.component.scss',
})
export class WeatherLandingComponent implements OnInit {
  constructor(private _weatherLandingService: WeatherLandingService) {}

  public ngOnInit(): void {
    console.log('weather component works');
    this._weatherLandingService
      .getForecast(52.52, 13.41)
      .subscribe((res) => console.log(res));
  }
}
