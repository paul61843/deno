// import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
// import { PORT, SAVE_FILE_PATH } from "./env/index.ts";
// import { WeatherAPI, ServerAPI } from "./api/api.ts";
// import { React, ReactDOMServer } from "./dep.ts";
// import { App, Index, WeatherTemplate } from "./pages/index.tsx";
// import { WEATHER_TODAY, WEATHER_TODAY_Search } from "./api/common/path.ts";
// import { writeJson, readJson, makeDirectory, getToday, getGPSInfo } from './utils/index.ts';
// import * as client from './controller/client/client.ts';

// const serverAPI = new ServerAPI();

// export function weatherToday ({ response }) {
//     makeDirectory(`./localDB/${getToday()}`);
//     const localData = await readJson(`./localDB/${getToday()}/weather.json`);
//     try {
//       const weatherAPI = new WeatherAPI();
//       const result = localData || await weatherAPI.getTodayWeather();
//       response.body = result;
//       localData || writeJson(`./localDB/${getToday()}/weather.json`, result);
//       response.status = 200;
//     } catch (error) {
//       response.status = 404;
//       response.body = {
//         success: false,
//         message: "No Found",
//       };
//       console.warn(error);
//     }
//   }