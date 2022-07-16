import { WeatherAPI } from "@api/api.ts";

const weatherApi = new WeatherAPI();
const midnightTime = "0:0";

export const start = () => {
  // 每分鐘執行一次
  setInterval(() => {
    const time = new Date("2017-07-09T00:00:00Z");
    const hour = time.getHours() + 8;
    const minute = time.getMinutes();
    const currentTime = `${hour}:${minute}`;

    if (currentTime === midnightTime) {
      weatherApi.getTodayWeather();
    }
  }, 60 * 1000);
};
