import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherLandingComponent } from './weather-landing/weather-landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherLandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
}
