import { WEATHER_FORECAST_THREE, WEATHER_TODAY } from './common/path.ts';
import { weatherGET, serverGET } from './utils/decorator.ts';

export class WeatherAPI {

    constructor() {

    }

    @weatherGET(WEATHER_FORECAST_THREE)
    async getTodayWeather(): Promise<any> {}
}

export class ServerAPI {

    constructor() {

    }

    @serverGET(WEATHER_TODAY)
    async getTodayWeather(): Promise<any> {}
}
