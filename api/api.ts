import {
  WEATHER_FORECAST_THREE,
  WEATHER_FORECAST_TAPIPEI_WEEK,
  WEATHER_TODAY,
  DATABASE_FIND_ONE,
  DATABASE_INSERT_ONE,
  DATABASE_DELETE_ONE,
} from "./common/path.ts";
import { weatherGET, serverGET, dataBasePOST } from "./utils/decorator.ts";

export class WeatherAPI {
  constructor() {}

  @weatherGET(WEATHER_FORECAST_THREE)
  async getTodayWeather(): Promise<any> {}

  @weatherGET(WEATHER_FORECAST_TAPIPEI_WEEK)
  async getTaipeiWeatherWeek(): Promise<any> {}
}

export class ServerAPI {
  constructor() {}

  @serverGET(WEATHER_TODAY)
  async getTodayWeather(): Promise<any> {}

  @serverGET("/weather/today/formated")
  async getfomatedTodayWeather(): Promise<any> {}
}

export class DatabaseAPI {
  constructor() {}

  @dataBasePOST(DATABASE_INSERT_ONE, {
    document: { text: new Date() },
  })
  async insertOne(): Promise<any> {}

  @dataBasePOST(DATABASE_FIND_ONE, {
    filter: { text: "Hello from the Data API!" },
  })
  async findOne(): Promise<any> {}

  @dataBasePOST(DATABASE_DELETE_ONE, {
    filter: { text: "Hello from the Data API!" },
  })
  async deleteOne(): Promise<any> {}
}
