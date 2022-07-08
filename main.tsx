import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { PORT, SAVE_FILE_PATH } from "./env/index.ts";
import { WeatherAPI, ServerAPI } from "./api/api.ts";
import { React, ReactDOMServer } from "./dep.ts";
import { App, Index, WeatherTemplate } from "./pages/index.tsx";
import { WEATHER_TODAY, WEATHER_TODAY_Search } from "./api/common/path.ts";
import { writeJson, readJson, makeDirectory } from './utils/file.ts';
import { getToday } from './utils/date.ts';

const app = new Application();
const router = new Router();

const weatherAPI = new WeatherAPI();
const serverAPI = new ServerAPI();

router.get("/", async ({ response }) => {
  const formatedWeather = await serverAPI.getfomatedTodayWeather();
  response.type = "text/html";
  response.body = Index(ReactDOMServer.renderToString(<WeatherTemplate weather={formatedWeather} />));
});

router.get(WEATHER_TODAY, async ({ response }) => {
  makeDirectory(`./localDB/${getToday()}`);
  const localData = await readJson(`./localDB/${getToday()}/weather.json`);
  try {
    const weatherAPI = new WeatherAPI();
    const result = localData || await weatherAPI.getTodayWeather();
    response.body = result;
    localData || writeJson(`./localDB/${getToday()}/weather.json`, result);
    response.status = 200;
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No Found",
    };
    console.warn(error);
  }
});

router.get('/weather/today/formated', async ({ response }) => {
  try {
    const weatherInfo = await serverAPI.getTodayWeather();
    const formatData = weatherInfo?.records?.location
      .reduce((previousValue: any[], { locationName, weatherElement }) => {
        const weatherElementLen = weatherElement.length;
        const { time } = weatherElement[0];
        const timeLen = time.length;

        let localationWeatherElement = [];
        for(let i=0; i<timeLen; i++) {

          let parameterObj = {};
          for(let j=0; j<weatherElementLen; j++) {
            const { elementName, time } = weatherElement[j];
            const { startTime, endTime, parameter } = time[i];
            const { parameterName, parameterValue, parameterUnit } = parameter;

            parameterObj = {
              ...parameterObj, 
              startTime, 
              endTime, 
              [`${elementName}Name`]: parameterName,
              [`${elementName}Value`]: parameterValue,
              [`${elementName}Unit`]: parameterUnit,
            };
          }
          localationWeatherElement.push(parameterObj);
        }
        return [...previousValue, { locationName, weatherElement: localationWeatherElement }];
        
      }, [])
    response.body = formatData;
    response.status = 200;
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No Found",
    };
    console.warn(error);
  }
});

router.get(WEATHER_TODAY_Search, async ({ request, response }) => {
  try {
    const queryString = new URLSearchParams(decodeURI(request?.url?.search));
    const cities = queryString.get("cities");
    const requestContent = cities ? cities.split(",") : [];
    const weatherAPI = new WeatherAPI();
    const todayWeather = await weatherAPI.getTodayWeather();
    const location = todayWeather?.records?.location;
    const searchResult = location.filter(
      ({ locationName }: { locationName: string }) =>
        requestContent.includes(locationName)
    );

    response.body = searchResult;
    response.status = 200;
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No Found",
    };
    console.warn(error);
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("listen", PORT);
await app.listen({ port: PORT });
