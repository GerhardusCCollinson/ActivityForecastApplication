import { gql } from 'graphql-request'

import { CityDetails } from "./cityDetails";

export const typeDefs = gql`
	${CityDetails}

	type Query {
		cityDetails(cityName: String): [CityDetails]
	}
`
