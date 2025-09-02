export interface GeocodingApi_SearchResults {
  results: GeocodingApi_Geoname[];
  generationtimeMs: number;
}

export interface GeocodingApi_Geoname {
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
