import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { WeatherApiMapped } from './models/weather-api-mapped.model';
import { WeatherLandingService } from './weather-landing.service';
import { WeatherBlockComponent } from './weather-block/weather-block.component';

@Component({
  selector: 'app-weather-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WeatherBlockComponent,
  ],
  templateUrl: './weather-landing.component.html',
  styleUrl: './weather-landing.component.scss',
})
export class WeatherLandingComponent implements OnInit {
  public weather$!: Observable<WeatherApiMapped>;
  public formGroup!: FormGroup;

  constructor(private _weatherLandingService: WeatherLandingService) {}

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      latitude: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      longitude: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    this._apiCall();
  }

  public onSubmit(): void {
    this._apiCall();
  }

  private _apiCall(): void {
    this.weather$ = this._weatherLandingService.getForecast(
      this.formGroup.get('latitude')?.value,
      this.formGroup.get('longitude')?.value
    );
  }
}
