import { Index, WeatherTemplate } from "@pages/index.tsx";
import { WeatherAPI, ServerAPI } from "@api/api.ts";
import { getGPSInfo } from "@utils/index.ts";
import { React, ReactDOMServer, Twind, TwindSheets } from "@/dep.ts";
import { getNearestCity } from "@/service/index.ts";

const sheet = TwindSheets.virtualSheet();

Twind.setup({ sheet });

const serverAPI = new ServerAPI();

export async function index({ request, response }) {
  try {
    const formatedWeather = await serverAPI.getfomatedTodayWeather();
    const GPSInfo = await getGPSInfo(request.ip);
    const nearestCity = getNearestCity(GPSInfo);
    const currentWeather = formatedWeather.find(
      (item) => item.locationName === nearestCity
    );

    sheet.reset();
    const body = ReactDOMServer.renderToString(
      <WeatherTemplate weather={currentWeather} />
      )
    const styleTag = TwindSheets.getStyleTag(sheet);

    response.type = "text/html";
    response.body = `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        ${styleTag}
      </head>
      <style>
        * {
          box-sizing: border-box;
          font-family: 微軟正黑體;
        }
        html, body {
          padding: 0;
          margin: 0;
        }
        h1, h2, h3, h4, h5 {
          margin: 0;
        }
        
      </style>
      <body>
        ${body}
      </body>
    </html>`
  } catch (error) {
    response.body = "error";
  }
}
