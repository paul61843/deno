import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { PORT } from "./env/index.ts";
import { WeatherAPI, ServerAPI } from "./api/api.ts";
import { appHtml } from "./pages/index.tsx";
import { React, ReactDOMServer } from "./dep.ts";
import { App, Index } from "./pages/index.tsx";
import { WEATHER_TODAY, WEATHER_TODAY_Search } from "./api/common/path.ts";

const app = new Application();
const router = new Router();

router.get("/", async ({ response }) => {
  const serverAPI = new ServerAPI();
  const todayWeather = await serverAPI.getTodayWeather();

  response.type = "text/html";
  response.body = Index(
    ReactDOMServer.renderToString(<App weather={todayWeather} />)
  );
});

router.get(WEATHER_TODAY, async ({ response }) => {
  try {
    const weatherAPI = new WeatherAPI();
    response.body = await weatherAPI.getTodayWeather();
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
