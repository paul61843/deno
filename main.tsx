import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { PORT } from "@env/index.ts";
import { WEATHER_TODAY, WEATHER_TODAY_Search, WEATHER_TODAY_FORMATED } from "@api/common/path.ts";
import * as client from "@controller/client/client.tsx";
import * as server from "@controller/server/server.tsx";
import * as middleware from "@middleware/index.ts";
import * as schedule from "@scheduling/index.ts";

const app = new Application();
const router = new Router();

// schdeule
schedule.start();

// api router
router.get(WEATHER_TODAY, server.weatherToday);
router.get(WEATHER_TODAY_FORMATED, server.weatherFormated);
router.get(WEATHER_TODAY_Search, server.weatherSearch);

// client router
router.get("/", client.index);

router.get("/(.*)", async (context) => {
  context.response.status = 404;
  context.response.body = "404 | Page not Found";
});

// middleware
app.use(middleware.allowedReadFile);

// router
app.use(router.routes());
app.use(router.allowedMethods());

try {
  console.log(`listen ${PORT}`);
  await app.listen({ port: PORT });
} catch (error) {
  console.log("error", error);
}
