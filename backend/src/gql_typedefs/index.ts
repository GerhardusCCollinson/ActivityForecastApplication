import { gql } from 'graphql-request'

import { CityDetails } from "./CityDetails";
import { ActivityForecast } from './ActivityForecast';

export const typeDefs = gql`
	${CityDetails}
	${ActivityForecast}

	type Query {
		cityDetails(cityName: String!): [CityDetails]
		activityForecast(activityForecastInput: ActivityForecastInput!): ActivityForecast
	}
`
