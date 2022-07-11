import { Index, WeatherTemplate } from "@pages/index.tsx";
import { WeatherAPI, ServerAPI } from "@api/api.ts";
import { getGPSInfo } from "@utils/index.ts";
import { React, ReactDOMServer } from "@/dep.ts";
import { getNearestCity } from "@/service/index.ts";

const serverAPI = new ServerAPI();

export async function index({ request, response }) {
  try {
    const formatedWeather = await serverAPI.getfomatedTodayWeather();
    const GPSInfo = await getGPSInfo(request.ip);
    const nearestCity = getNearestCity(GPSInfo);
    const currentWeather = formatedWeather.find(
      (item) => item.locationName === nearestCity
    );

    response.type = "text/html";
    response.body = Index(
      ReactDOMServer.renderToString(
        <WeatherTemplate weather={currentWeather} />
      )
    );
  } catch (error) {
    response.body = "error";
  }
}
