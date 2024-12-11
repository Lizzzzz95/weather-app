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

  constructor() {}
  public ngOnInit(): void {}
}
