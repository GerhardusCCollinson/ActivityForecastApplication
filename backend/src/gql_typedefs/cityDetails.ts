import { gql } from 'graphql-request';

export const CityDetails = gql`
	type CityDetails {
		name: String
		longitude: Float
		lattitude: Float
		elevation: Float
	}
`;
