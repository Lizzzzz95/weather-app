import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherBlockComponent } from './weather-block.component';

describe('WeatherBlockComponent', () => {
  let component: WeatherBlockComponent;
  let fixture: ComponentFixture<WeatherBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherBlockComponent);
    component = fixture.componentInstance;
    component.weatherData = { maxTemp: 0, minTemp: 0, date: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display sunny weather icon when max temp is equal to or more than 25', () => {
    component.weatherData.maxTemp = 26;
    component.ngOnInit();
    expect(component.iconSrc).toEqual('assets/images/day.svg');
  });

  it('should display cloudy weather icon when max temp is equal to or more than 1', () => {
    component.weatherData.maxTemp = 3;
    component.ngOnInit();
    expect(component.iconSrc).toEqual('assets/images/cloudy-day-3.svg');
  });

  it('should display snowy weather icon when max temp is less than 1', () => {
    component.weatherData.maxTemp = -3;
    component.ngOnInit();
    expect(component.iconSrc).toEqual('assets/images/snowy-6.svg');
  });
});
