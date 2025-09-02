import { gql } from 'graphql-request';

export const CityDetails = gql`
	type CityDetails {
		country: String
		countryCode: String
		elevation: Float
		longitude: Float
		latitude: Float
		name: String
		population: Int
	}
`;
