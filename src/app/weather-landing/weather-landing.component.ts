import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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
export class WeatherLandingComponent implements OnInit, OnDestroy {
  public weather: WeatherApiMapped | undefined;
  public formGroup!: FormGroup;
  public latitudeDisplay!: number;
  public longitudeDisplay!: number;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _weatherLandingService: WeatherLandingService) {}

  public ngOnInit(): void {
    this._initValues();
    this._apiCall();
  }

  public onSubmit(): void {
    this._apiCall();
  }

  private _apiCall(): void {
    let latitudeUpdate: number = this.formGroup.get('latitude')?.value;
    let longitudeUpdate: number = this.formGroup.get('longitude')?.value;

    this._weatherLandingService
      .getForecast(latitudeUpdate, longitudeUpdate)
      .pipe(takeUntil(this._destroy$))
      .subscribe((res: WeatherApiMapped) => {
        this.weather = res;
        this.latitudeDisplay = latitudeUpdate;
        this.longitudeDisplay = longitudeUpdate;
      });
  }

  private _initValues(): void {
    this.latitudeDisplay = 0;
    this.longitudeDisplay = 0;

    this.formGroup = new FormGroup({
      latitude: new FormControl(this.latitudeDisplay, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      longitude: new FormControl(this.longitudeDisplay, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
