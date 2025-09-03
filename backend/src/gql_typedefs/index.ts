import { gql } from 'graphql-request'

import { CityDetails } from "./CityDetails";
import { ActivityForecast } from './ActivityForecast';

export const typeDefs = gql`
	${CityDetails}
	${ActivityForecast}

	type Query {
		"Search for cities by name"
		cityDetails(cityName: String!): [CityDetails]
		"Get activity suitability forecast for the given coordinates"
		activityForecast(activityForecastInput: ActivityForecastInput!): ActivityForecast
	}
`
