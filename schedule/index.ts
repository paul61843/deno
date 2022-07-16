import { WeatherAPI } from "@api/api.ts";

const weatherApi = new WeatherAPI();

export const start = () => {
  // 每 6 小時取得天氣資料
  setTimeout(() => {
    weatherApi.getTodayWeather();
  }, 6 * 60 * 60);
};
