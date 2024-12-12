import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { genericErrMsg } from './models/constants';
import { WeatherApiMapped } from './models/weather-api-mapped.model';
import { WeatherBlockComponent } from './weather-block/weather-block.component';
import { WeatherLandingService } from './weather-landing.service';

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
  public latitudeDisplay: number = 0;
  public longitudeDisplay: number = 0;
  public errorMessage: string | null = null;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _weatherLandingService: WeatherLandingService) {}

  public ngOnInit(): void {
    this._initValues();
    this._apiCall();
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this._apiCall();
    } else {
      this.errorMessage = genericErrMsg;
    }
  }

  private _apiCall(): void {
    let latitudeUpdate: number = this.formGroup.get('latitude')?.value;
    let longitudeUpdate: number = this.formGroup.get('longitude')?.value;

    this._weatherLandingService
      .getForecast(latitudeUpdate, longitudeUpdate)
      .pipe(takeUntil(this._destroy$))
      .subscribe({
        next: (res: WeatherApiMapped) => {
          this.weather = res;
          this.latitudeDisplay = latitudeUpdate;
          this.longitudeDisplay = longitudeUpdate;
          this.errorMessage = null;
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.reason;
        },
      });
  }

  private _initValues(): void {
    const validators: ValidatorFn[] = [
      Validators.required,
      Validators.maxLength(15),
      Validators.pattern(new RegExp(/[^a-zA-Z]/)),
    ];

    this.formGroup = new FormGroup({
      latitude: new FormControl(this.latitudeDisplay, validators),
      longitude: new FormControl(this.longitudeDisplay, validators),
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
