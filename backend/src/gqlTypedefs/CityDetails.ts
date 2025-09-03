import { gql } from 'graphql-request';

export const CityDetails = gql`
	"Basic information about a city from geocoding"
	type CityDetails {
		"Country name"
		country: String
		"ISO 3166-1 alpha-2 country code"
		countryCode: String
		"Elevation above sea level in meters"
		elevation: Float
		"Longitude in decimal degrees"
		longitude: Float
		"Latitude in decimal degrees"
		latitude: Float
		"City name"
		name: String
		"Estimated population"
		population: Int
	}
`;
