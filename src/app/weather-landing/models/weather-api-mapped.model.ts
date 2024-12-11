export interface WeatherApiMapped {
  weather: {
    minTemp: number;
    maxTemp: number;
    date: string;
  }[];
}
