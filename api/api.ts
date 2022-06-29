import { WEATHER_FORECAST_THREE } from './path.ts';
import { GET } from './decorator.ts';

export class WeatherAPI {

    constructor() {

    }

    @GET(WEATHER_FORECAST_THREE)
    async getTodayWeather(): Promise<void> {}
}
