import { Application, Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { PORT } from "./env/index.ts";
import { WEATHER_TODAY, WEATHER_TODAY_Search } from "./api/common/path.ts";
import * as client from "./controller/client/client.tsx";
import * as server from "./controller/server/server.tsx";

const app = new Application();
const router = new Router();

// api router
router.get(WEATHER_TODAY, server.weatherToday);
router.get("/weather/today/formated", server.weatherFormated);
router.get(WEATHER_TODAY_Search, server.weatherSearch);

// client router
router.get("/", client.index);

app.use(router.routes());
app.use(router.allowedMethods());

console.log("listen", PORT);
await app.listen({ port: PORT });
