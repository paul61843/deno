import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { PORT } from "./env/index.ts";
import { WeatherAPI } from "./api/api.ts";
import { appHtml } from "./pages/index.tsx";
import { React, ReactDOMServer } from "./dep.ts";
import { App, Index } from "./pages/index.tsx";

const app = new Application();
const router = new Router();

router.get("/", async ({ response }) => {
  const weatherAPI = new WeatherAPI();
  const todayWeather = await weatherAPI.getTodayWeather();
  // console.log(todayWeather);

  response.type = "text/html";
  response.body = Index(
    ReactDOMServer.renderToString(<App weather={todayWeather} />)
  );
});

router.get("/weather/today", async ({ response }) => {
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

app.use(router.routes());
app.use(router.allowedMethods());

console.log("listen", PORT);
await app.listen({ port: PORT });
