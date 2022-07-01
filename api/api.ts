import { WEATHER_FORECAST_THREE } from './common/path.ts';
import { weatherGET } from './utils/decorator.ts';

export class WeatherAPI {

    constructor() {

    }

    @weatherGET(WEATHER_FORECAST_THREE)
    async getTodayWeather(): Promise<any> {}
}
