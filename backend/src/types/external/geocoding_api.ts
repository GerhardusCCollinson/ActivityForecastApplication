export interface GeocodingApiSearchResponse {
  results?: GeocodingApiGeoname[];
  generationtime_ms: number;
}

export interface GeocodingApiGeoname {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  ranking: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  country_id: number;
  country: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  timezone: string;
  population: number;
  postcodes: string[];
}
