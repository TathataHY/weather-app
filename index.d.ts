import { AirQuality } from "./types/air-quality-data";
import { Forecast } from "./types/forecast-data";
import { UvIndex } from "./types/uv-index-data";
import { WeatherInterface } from "./types/weather-data";

export { };

declare global {
  interface ForecastData extends Forecast {}
  interface AirQualityData extends AirQuality {}
  interface WeatherData extends WeatherInterface {}
  interface UvIndexData extends UvIndex {}
  interface DefaultState {
    name: string;
    country: string;
    state: string;
    lat: number;
    lon: number;
  }
}
