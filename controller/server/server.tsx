import { WeatherAPI, ServerAPI, DatabaseAPI } from "@/api/api.ts";
import {
  writeTextFile,
  readTextFile,
  makeDirectory,
  getToday,
} from "@utils/index.ts";

const weatherAPI = new WeatherAPI();
const serverAPI = new ServerAPI();
const databaseAPI = new DatabaseAPI();

export async function weatherToday({ response }) {
  makeDirectory(`./localDB/${getToday()}`);
  const localData = await readTextFile(`./localDB/${getToday()}/weather.json`);
  try {
    const weatherAPI = new WeatherAPI();
    const result = localData || (await weatherAPI.getTodayWeather());
    response.body = result;
    localData || writeTextFile(`./localDB/${getToday()}/weather.json`, result);
    response.status = 200;
  } catch (error) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No Found",
    };
    console.warn(error);
  }
}

export async function weatherFormated({ response }) {
  try {
    const weatherInfo = await serverAPI.getTodayWeather();
    const formatData = weatherInfo?.records?.location.reduce(
      (previousValue: any[], { locationName, weatherElement }) => {
        const weatherElementLen = weatherElement.length;
        const { time } = weatherElement[0];
        const timeLen = time.length;

        let localationWeatherElement = [];
        for (let i = 0; i < timeLen; i++) {
          let parameterObj = {};
          for (let j = 0; j < weatherElementLen; j++) {
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
        return [
          ...previousValue,
          { locationName, weatherElement: localationWeatherElement },
        ];
      },
      []
    );
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
}

export async function weatherSearch({ request, response }) {
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
}
