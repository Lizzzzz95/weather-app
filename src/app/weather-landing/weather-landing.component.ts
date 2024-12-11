import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherApiMapped } from './models/weather-api-mapped.model';
import { WeatherLandingService } from './weather-landing.service';
import { WeatherBlockComponent } from './weather-block/weather-block.component';

@Component({
  selector: 'app-weather-landing',
  standalone: true,
  imports: [CommonModule, WeatherBlockComponent],
  templateUrl: './weather-landing.component.html',
  styleUrl: './weather-landing.component.scss',
})
export class WeatherLandingComponent implements OnInit {
  public weather$!: Observable<WeatherApiMapped>;

  constructor(private _weatherLandingService: WeatherLandingService) {}

  public ngOnInit(): void {
    this.weather$ = this._weatherLandingService.getForecast(52.52, 13.41);
  }
}
