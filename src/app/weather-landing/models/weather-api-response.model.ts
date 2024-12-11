export interface WeatherApiResponse {
  daily: {
    apparent_temperature_max: number[];
    apparent_temperature_min: number[];
    time: string[];
  };
  daily_units: {
    apparent_temperature_max: string;
    apparent_temperature_min: string;
    time: string;
  };
  elevation: string;
  generationtime_ms: number;
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
}
