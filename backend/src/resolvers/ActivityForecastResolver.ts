import { ActivityForecastService } from "../services/activityForecastService";
import type { ActivityForecast } from "../types";

export async function activityForecastResolver (
	_parent: unknown,
	args: ActivityForecastArgs
): Promise<ActivityForecast> {
	const activityService = new ActivityForecastService();
	return await activityService.getDailyForecast(args.activityForecastInput);
}

interface ActivityForecastArgs {
	activityForecastInput: {
		latitude: number
		longitude: number
	}
}
