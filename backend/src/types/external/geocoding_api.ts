export interface GeocodingApiSearchResults {
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
  featureCode: string;
  countryCode: string;
  countryId: number;
  country: string;
  admin1Id: number;
  admin2Id: number;
  admin3Id: number;
  admin4Id: number;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  timezone: string;
  population: number;
  postcodes: string[];
}
