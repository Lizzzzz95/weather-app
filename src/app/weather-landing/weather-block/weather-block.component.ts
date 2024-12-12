import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherBlock } from '../models/weather-block.model';

@Component({
  selector: 'app-weather-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-block.component.html',
  styleUrl: './weather-block.component.scss',
})
export class WeatherBlockComponent implements OnInit {
  @Input() public weatherData!: WeatherBlock;
  public iconSrc: string = 'assets/images/cloudy-day-3.svg';

  constructor() {}

  public ngOnInit(): void {
    if (this.weatherData.maxTemp >= 25) {
      this.iconSrc = 'assets/images/day.svg';
    } else if (this.weatherData.maxTemp >= 1) {
      this.iconSrc = 'assets/images/cloudy-day-3.svg';
    } else {
      this.iconSrc = 'assets/images/snowy-6.svg';
    }
  }
}
