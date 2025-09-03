import { activityForecastResolver } from "./activityForecastResolver";
import { cityDetailsResolver } from "./cityDetailsResolver";

export const resolvers = {
	Query: {
		cityDetails: cityDetailsResolver,
		activityForecast: activityForecastResolver,
	}
}
