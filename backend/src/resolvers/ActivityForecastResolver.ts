import { ActivityForecastService } from "../services/ActivityForecastService";
import type { ActivityForecast } from "../types";

export async function ActivityForecastResolver (
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
