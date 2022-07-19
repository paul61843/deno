import { WeatherAPI } from "@api/api.ts";

const weatherApi = new WeatherAPI();
const midnightTime = "0:0";

export const start = () => {
  // 每分鐘執行一次
  setInterval(() => {
    const dateTime = new Date();
    const hour = dateTime.getHours() + 8;
    const minute = dateTime.getMinutes();
    const currentTime = `${hour}:${minute}`;
    if (currentTime === midnightTime) {
      weatherApi.getTodayWeather();
    }
  }, 60 * 1000);
};
