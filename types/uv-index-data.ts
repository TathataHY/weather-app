interface DailyUnits {
  time: string;
  uv_index_max: string; // Puedes cambiar el tipo según el tipo real de los datos
  uv_index_clear_sky_max: string; // Puedes cambiar el tipo según el tipo real de los datos
}

interface DailyData {
  time: string[];
  uv_index_max: number[];
  uv_index_clear_sky_max: number[];
}

export interface UvIndex {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyData;
}
