import { gql } from 'graphql-request'

import { CityDetails } from "./CityDetails";

export const typeDefs = gql`
	${CityDetails}

	type Query {
		cityDetails(cityName: String!): [CityDetails]
	}
`
